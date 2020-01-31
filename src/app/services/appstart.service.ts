import { Injectable } from '@angular/core';
import { IAppStartService } from '../interfaces/appstart.service.interface';
import { SessionService } from './session.service';
import { AppsettingsService } from './appsettings.service';
import { AppSettingModel } from '../models/appsetting.model';

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
    // Log.
    console.log('Clear session.');
    // Send promise.
    return new Promise<void>(
      (resolve, reject) => {
        // Get app settings.
        this.appSettingsService
            .getAppSettings()
            .then(
              (dataAppSetting : AppSettingModel) => {
                // Set in session.
                this.sessionService.setAppSetting(dataAppSetting);
                // Set success
                return true;
              },
              (reason : any) => {
                // Set fail
                return false;
              }
            )
            .then(
              (stateGetAppSetting : boolean) => {
                // Log.
                console.log(`GetAppSettings state: ${stateGetAppSetting}.`);
                // Send.
                resolve();
              }
            );
      }
    );
  }

}
