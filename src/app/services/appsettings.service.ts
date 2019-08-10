import { Injectable } from '@angular/core';
import { IAppsettingsService } from '../interfaces/appsettingsservice.interface';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from 'src/app/models/appsetting.model';

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService implements IAppsettingsService {

  private urlResource : string = 'appsettings.json';

  constructor(private httpClient: HttpClient) { }

  getAppSettings(): Promise<AppSetting> {
    return  this.httpClient.get<AppSetting>(this.urlResource)
                .toPromise();
  }

}
