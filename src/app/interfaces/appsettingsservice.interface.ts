import { AppSetting } from 'src/app/models/appsetting.model';

export interface IAppsettingsService {

    getAppSettings() : Promise<AppSetting>;

}
