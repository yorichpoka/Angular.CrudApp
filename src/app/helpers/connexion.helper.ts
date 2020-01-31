import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';
import { AppSettingModel } from '../models/appsetting.model';

export class Connexion {

    token           : TokenModel;
    user            : UserModel;
    appSetting      : AppSettingModel;
    idConnectionHub : string;

    constructor(
        token : TokenModel = new TokenModel(), 
        user : UserModel = new UserModel(), 
        appSetting: AppSettingModel = new AppSettingModel(),
        idConnectionHub : string = null) {
        this.token = token;
        this.user = user;
        this.appSetting = appSetting;
        this.idConnectionHub = idConnectionHub;
    }

}