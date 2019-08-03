import { FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';

export class FormModal {

    public title            : string = 'Create new data';
    public group            : FormGroup;
    public modal            : BsModalRef
    public modalFormConfig  : any = {
                                        backdrop            : true,
                                        ignoreBackdropClick : true,
                                        class               : 'modal-md'
                                    };

    constructor(private modalService: BsModalService, group : FormGroup) {
        this.group = group;
    }

    show(template: TemplateRef<any>) : void {
        this.modal = this.modalService.show(template, this.modalFormConfig);
    }

}