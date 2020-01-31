import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { TokenModel } from '../../models/token.model';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { EFaIcon } from 'src/app/enums/faicon.enum';
import { ETypeNotify } from 'src/app/enums/typenotify';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userSignInForm            : FormGroup;
  loadingButton             : LoadingButton = new LoadingButton('Authentication', EFaIcon.SignIn, 'Loading');
  @Output() onUserConnected : EventEmitter<UserModel> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.initUserConnected();
    this.initForm();
  }

  // When login form is submit.
  onSignIn(): void {
    // Load button.
    this.loadingButton.start();

    var user: UserModel = new UserModel();
        user.login    = this.userSignInForm.get('login').value;
        user.password = this.userSignInForm.get('password').value;

    // Request
    this.usersService
      .authentication(user)
      .then(
        (dataTokenJWT: TokenModel) => {
          // get localsession.
          this.sessionService.setToken(dataTokenJWT);
          // set user session.
          this.sessionService.setUser(dataTokenJWT.user);
          // Emit user.
          this.onUserConnected.emit(dataTokenJWT.user);
          // Loginuser server
          this.usersService.logInServer(dataTokenJWT.user.id);
          return null;
        },
        (reason: any) => {
          return reason;
        }
      )
      .then(
        (errorResponse: HttpErrorResponse) => {
          // Message
          var errorMessage : string = null;
          // Check status
          if (errorResponse == null)
            // Redirect to main page.
            this.router.navigate(['/users']);
          else if (errorResponse.status != 0)
            // Get error error
            errorMessage = errorResponse.error;
          else
            // Get error message
            errorMessage = errorResponse.message;

          return errorMessage;
        }
      )
      .then(
        (errorMessage : string) => {
          if (errorMessage != null) {
            // Notification
            Utils.notification(errorMessage, ETypeNotify.Error, this.sessionService.getAppSetting().config.notifyDuration);
            // Reset form
            this.userSignInForm.setValue({ 
              login: null,
              password: null
            });
          }
        }
      )
      .finally(
        () => {
          // Load button.
          this.loadingButton.stop();
        }
      );
  }

  /* Init form values. */
  initForm(): void {
    // Init form.
    this.userSignInForm = this.formBuilder.group({
      login: [
        'sys',
        [Validators.required, Validators.minLength(3)]
      ],
      password: [
        'sys',
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }

  /** TODO */
  initUserConnected(): void {
    const user: UserModel = new UserModel();
    // set user session.
    this.sessionService.setUser(user);
    // Emit user.
    this.onUserConnected.emit(user);
  }

}
