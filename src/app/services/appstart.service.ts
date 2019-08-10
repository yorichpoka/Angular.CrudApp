import { Injectable } from '@angular/core';
import { IAppStartService } from '../interfaces/appstartservice.interface';
import { SessionService } from './session.service';
import { AppsettingsService } from './appsettings.service';
import { AppSetting } from '../models/appsetting.model';

@Injectable({
  providedIn: 'root'
})
export class AppStartService implements IAppStartService {

  constructor(
    private sessionService: SessionService,
    private appSettingsService : AppsettingsService) { }

  start(): Promise<void> {
    // Log.
    console.log('Application start.');
    // Clear session.
    this.sessionService.init();
    // Send promise.
    return new Promise<void>(
      (resolve, reject) => {
        // Get app settings.
        this.appSettingsService
            .getAppSettings()
            .then(
              (dataAppSetting : AppSetting) => {
                // Set in session.
                this.sessionService.setAppSetting(dataAppSetting);
              }
            )
            .then(
              () => {
                // Send.
                resolve();
              }
            );
      }
    );
  }

}
