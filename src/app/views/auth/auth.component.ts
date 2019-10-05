import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { TokenJWT } from '../../models/tokenjwt.model';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { EFaIcon } from 'src/app/enums/faicon.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userSignInForm            : FormGroup;
  loadingButton             : LoadingButton = new LoadingButton('Authentication', EFaIcon.SignIn, 'Loading');
  @Output() eEUserConnected : EventEmitter<User> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.initUserConnected();
  }

  // When login form is submit.
  onSignIn(): void {
    var user: User = new User();
        user.login = this.userSignInForm.get('login').value;
        user.password = this.userSignInForm.get('password').value;

    // Load button.
    this.loadingButton.start();

    this.usersService
      .authentication(user)
      .then(
        (dataTokenJWT: TokenJWT) => {
          // get localsession.
          this.sessionService.setToken(dataTokenJWT);
          // set user session.
          this.sessionService.setUser(dataTokenJWT.user);
          // Emit user.
          this.eEUserConnected.emit(dataTokenJWT.user);
          return null;
        },
        (reason: any) => {
          return reason;
        }
      )
      .then(
        (errorResponse: HttpErrorResponse) => {
          // Load button.
          this.loadingButton.stop();

          if (errorResponse == null) {
            // Redirect to main page.
            this.router.navigate(['/users']);
          } else if (errorResponse.status != 0) {
            Utils.notification(errorResponse.error);
          } else {
            Utils.notification(errorResponse.statusText);
          }
        }
      );
  }

  // Init form values.
  initForm(): void {
    // Init form.
    this.userSignInForm = this.formBuilder.group({
      login: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }

  initUserConnected(): void {
    const user: User = new User();
    // set user session.
    this.sessionService.setUser(user);
    // Emit user.
    this.eEUserConnected.emit(user);
  }

}
