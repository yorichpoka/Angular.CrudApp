export class AppSettingModel {

    public title    : string;
    public version  : string;
    public apiUrl   : string;
    public config   : ConfigModel;

    constructor() {}

}

class ConfigModel {

    public notifyDuration : number;
    public messageBoxDuration : number;

    constructor() {}

}
