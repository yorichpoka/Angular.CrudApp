import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { TokenJWT } from '../../models/tokenjwt.model';
import { SessionService } from 'src/app/services/session.service';
import { EComponent } from 'src/app/enums/component.enum';
import { BaseViewComponent } from 'src/app/helpers/base.viewcomponent.helper';
import { UsersService } from 'src/app/services/users.service';
import { ETypeNotify } from 'src/app/enums/typenotify';
import { HttpErrorResponse } from '@angular/common/http';
import * as Utils from 'src/app/helpers/utils.helper';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends BaseViewComponent implements OnInit {

  userSignInForm            : FormGroup;
  @Output() eEUserConnected : EventEmitter<User> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder, 
    private usersService: UsersService,
    private sessionService: SessionService,
    private router: Router) {
      super(EComponent.AuthComponent);
  }

  ngOnInit() {
    this.initForm();
    this.initUserConnected();
  }

  // When login form is submit.
  onSignIn() {
    var user : User   = new User();
        user.login    = this.userSignInForm.get('login').value;
        user.password = this.userSignInForm.get('password').value;

    this.usersService
        .authentication(user)
        .then(
          // Success.
          (dataTokenJWT : TokenJWT) => {
            // get localsession.
            this.sessionService.setToken(dataTokenJWT);
            // set user session.
            this.sessionService.setUser(dataTokenJWT.user);
            // Emit user.
            this.eEUserConnected.emit(dataTokenJWT.user);
            // Redirect to main page.
            this.router.navigate(['/users']);
          },
          // Fail.
          (reason : HttpErrorResponse) => {
            Utils.notification(reason.error);
          }
        );
  }

  // Init form values.
  initForm() {
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

  initUserConnected() : void {
    const user : User = new User();
    // set user session.
    this.sessionService.setUser(user);
    // Emit user.
    this.eEUserConnected.emit(user);
  }

}
