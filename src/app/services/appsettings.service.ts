import { Injectable } from '@angular/core';
import { IAppsettingsService } from '../interfaces/appsettingsservice.interface';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from 'src/app/models/appsetting.model';

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService implements IAppsettingsService {

  private keyAppSetting: string;

  constructor(
    private httpClient: HttpClient) {
    this.keyAppSetting = 'AppSetting';
  }

  getAppSettings(): Promise<AppSetting> {
    return new Promise<AppSetting>(
      (resolve, reject) => {
        // If already exist in session.
        if (this.isExistAppSetting()) {
          // Send result.
          resolve(this.getAppSetting());
        } else {
          this.httpClient.get<AppSetting>("appsettings.json")
            .toPromise()
            .then(
              (dataAppSetting: AppSetting) => {
                // Add appSetting in session.
                this.setAppSetting(dataAppSetting);
                // Send result.
                resolve(dataAppSetting);
              }
            )
            .catch(
              (reason: any) => {
                reject(reason);
              }
            );
        }
      }
    );
  }

  // #region appSetting
  private isExistAppSetting(): boolean {
    var appSetting: AppSetting = this.getAppSetting();

    return (appSetting != undefined && appSetting != null);
  }

  private getAppSetting(): AppSetting {
    var appSetting: AppSetting = JSON.parse(
      sessionStorage.getItem(this.keyAppSetting)
    );

    return appSetting;
  }

  private setAppSetting(appSetting: AppSetting): void {
    sessionStorage.setItem(
      this.keyAppSetting,
      JSON.stringify(appSetting)
    );
  }
  //#endregion

}
