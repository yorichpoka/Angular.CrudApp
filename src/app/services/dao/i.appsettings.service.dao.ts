import { AppSetting } from 'src/app/models/appsetting.model';

export interface IAppsettingsServiceDAO {

    getAppSettings() : Promise<AppSetting>;

}
