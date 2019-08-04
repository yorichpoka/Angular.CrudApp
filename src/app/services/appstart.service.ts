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
    return new Promise<void>(
      (resolve, reject) => {
        // Log.
        console.log('Application start.');
        // Get app settings.
        this.appSettingsService
            .getAppSettings()
            .then(
              (dataAppSetting : AppSetting) => {
                // Set in session.
                this.sessionService.setAppSetting(dataAppSetting);
              }
            )
            .finally(
              () => {
                // Send.
                resolve();
              }
            );
      }
    );
  }

}
