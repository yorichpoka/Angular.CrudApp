import { EComponent } from '../enums/component.enum';

export class BaseViewComponent {

    public name : EComponent;

    constructor(name : EComponent) {
        this.name = name;
    }

}