import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/impl/users.service';
import { User } from '../../models/user.model';
import { TokenJWT } from '../../models/tokenjwt.model';
import { SessionService } from 'src/app/services/impl/session.service';
import { BaseComponent } from 'src/app/helpers/base.component';
import { EComponent } from 'src/app/models/enums/component.enum';

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
    const user = new User(0, 0, this.userSignInForm.get('login').value, this.userSignInForm.get('password').value);

    this.usersService.authentication(user).subscribe(
      // Next.
      (response: TokenJWT) => {
        // get localsession.
        this.sessionService.setToken(response);
        // set user session.
        this.sessionService.setUserConnected(response.user);
        // Redirect to main page.
        this.router.navigate(['/users']);
      },
      // Error.
      (error) => {
        this.errorMessage = error;
        alert(JSON.stringify(this.errorMessage));
      },
      // Complete.
      () => {
        console.log('usersService.authentication(user) complete.');
      }
    );
  }

  // Init form values.
  initForm() {
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
    
    // Reset user connected.
    this.sessionService.resetUserConnected();
  }

}
