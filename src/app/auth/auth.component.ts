import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/impl/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userSignInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onSignIn() {
    const login = this.userSignInForm.get('login').value;
    const password = this.userSignInForm.get('password').value;

    this.usersService.readByLoginAndPassword(login, password).then(
      () => {
        this.router.navigate(['/admin', 'dashboard'])
      },
      (error) => {
        this.errMsg = error;
        alert(this.errMsg);
      }
    );
  }

  initForm() {
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
