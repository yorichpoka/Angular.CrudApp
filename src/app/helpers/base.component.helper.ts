import { EComponent } from '../models/enums/component.enum';

export class BaseComponent {

    public name : EComponent;

    constructor(name : EComponent) {
        this.name = name;
    }

}