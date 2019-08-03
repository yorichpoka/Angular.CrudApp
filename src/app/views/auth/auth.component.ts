import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { TokenJWT } from '../../models/tokenjwt.model';
import { SessionService } from 'src/app/services/session.service';
import { EComponent } from 'src/app/enums/component.enum';
import { BaseViewComponent } from 'src/app/helpers/base.viewcomponent.helper';
import { UsersService } from 'src/app/services/users.service';
import notify from 'devextreme/ui/notify';
import { ETypeNotify } from 'src/app/enums/typenotify';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends BaseViewComponent implements OnInit {

  userSignInForm: FormGroup;
  errorMessage : string;

  constructor(
    private formBuilder: FormBuilder, 
    private usersService: UsersService,
    private sessionService: SessionService,
    private router: Router) {
      super(EComponent.AuthComponent);
  }

  ngOnInit() {
    this.initForm();
  }

  // When login form is submit.
  onSignIn() {
    var user : User = new User();
        user.login = this.userSignInForm.get('login').value;
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
            // Redirect to main page.
            this.router.navigate(['/users']);
          },
          // Fail.
          (reason : any) => {
            notify({message : JSON.stringify(reason), width : 'auto' }, ETypeNotify.Error, 3000);
          }
        );
  }

  // Init form values.
  initForm() {
    // Reset user connected.
    this.sessionService.init();
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

}
