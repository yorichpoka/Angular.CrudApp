import { AppSettingModel } from 'src/app/models/appsetting.model';

export interface IAppsettingsService {

    getAppSettings() : Promise<AppSettingModel>;

}
