import { Injectable } from '@angular/core';
import { IAppStartService } from '../interfaces/appstartservice.interface';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AppStartService implements IAppStartService {

  constructor(private sessionService: SessionService) { }

  start(): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        // Log.
        console.log('Application start.');
        // Clear session.
        this.sessionService.clear();
        // Send.
        resolve();
      }
    );
  }

}
