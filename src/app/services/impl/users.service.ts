import { Injectable } from '@angular/core';
import { IUsersServiceDAO } from '../dao/i.users.service.dao';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUsersServiceDAO  {

  constructor() { }

  create(obj: User): Promise<void> {
    return new Promise(
      (functionResolve, functionReject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            functionResolve();
            console.log('connecté');
          },
          (error) => {
            functionReject(error);
          }
        )
      }
    );
  }
  readById(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  readByLoginAndPassword(login: string, pasword: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  readAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  update(id: number, obj: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}
