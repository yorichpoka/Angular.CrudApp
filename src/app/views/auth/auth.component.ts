import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/impl/users.service';
import { User } from '../../models/user.model';
import { TokenJWT } from '../../models/tokenjwt.model';
import { SessionService } from 'src/app/services/impl/session.service';
import { BaseComponent } from 'src/app/helpers/base.component';
import { EComponent } from 'src/app/models/enums/component.enum';
import { RolesService } from 'src/app/services/impl/roles.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends BaseComponent implements OnInit {

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
          (dataTokenJWT : TokenJWT) => {
            // get localsession.
            this.sessionService.setToken(dataTokenJWT);
            // set user session.
            this.sessionService.setUserConnected(dataTokenJWT.user);
            // Redirect to main page.
            this.router.navigate(['/users']);
          }
        )
        .catch(
          (reason : any) => {
            this.errorMessage = JSON.stringify(reason);
          }
        );
  }

  // Init form values.
  initForm() {
    // Reset user connected.
    this.sessionService.clear();

    // Init form.
    this.userSignInForm = this.formBuilder.group({
      login: [
        '', 
        [Validators.required]
      ],
      password: [
        '', 
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]
      ]
    });
  }

}
