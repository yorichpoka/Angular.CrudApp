import { Injectable } from '@angular/core';
import { IAppsettingsService } from '../interfaces/appsettings.service.interface';
import { HttpClient } from '@angular/common/http';
import { AppSettingModel } from 'src/app/models/appsetting.model';

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService implements IAppsettingsService {

  private _urlResource : string = 'appsettings.json';

  constructor(private httpClient: HttpClient) { }

  getAppSettings(): Promise<AppSettingModel> {
    return  this.httpClient.get<AppSettingModel>(this._urlResource)
                .toPromise();
  }

}
