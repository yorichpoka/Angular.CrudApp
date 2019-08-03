import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import ArrayStore from 'devextreme/data/array_store'
import { DxDataGridComponent } from 'devextreme-angular';
import { Role } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { EComponent } from 'src/app/enums/component.enum';
import { BaseViewComponent } from 'src/app/helpers/base.viewcomponent.helper';
import { UsersService } from 'src/app/services/users.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { FormModal } from 'src/app/helpers/formmodal.helper';
import { confirm } from 'devextreme/ui/dialog';
import * as Utils from 'src/app/helpers/utils.helper';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseViewComponent implements OnInit {

  formModal       : FormModal;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  usersDataSource : ArrayStore;
  rolesDataSource : Role[];
  errorMessage    : string;
  selectedRow     : Array<number>;
  selectedItemKeys: any[] = [];

  constructor(
    private usersService : UsersService,
    private rolesService : RolesService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder) {
      super(EComponent.UsersComponent);
  }

  ngOnInit() {
    this.loadUsersDataSource();
    this.loadRolesDataSource();
  }

  loadUsersDataSource() : void {
    this.usersService
        .readAll()
        .then(
          (dataUsers : User[]) => {
            this.usersDataSource = new ArrayStore({
              key: "id",
              data: dataUsers
            });
            this.selectedRow = [1];
          }
        )
        .catch(
          // Error.
          (reason : any) => {
            this.errorMessage = reason.error;
          }
    );
  }

  loadRolesDataSource() : void {
    this.rolesService.readAll().subscribe(
      // Next.
      (data : Role[]) => {
        this.rolesDataSource = data;
      },
      // Error.
      (error : HttpErrorResponse) => {
        this.errorMessage = error.message;
      },
      // Complete.
      () => {
        console.log('Complete : "rolesService.readAll"');
      }
    );
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  deleteRecords() {
      confirm(Utils.messageConfirmdDelete(), 'Confirmation')
      .then(
        (dataBoolean : boolean) => {
          if(dataBoolean) {
            this.selectedItemKeys.forEach((key) => {
                this.usersDataSource.remove(key);
            });
            this.dataGrid.instance.refresh();
          }
        }
      );
  }

  newRecord(template: TemplateRef<any>) : void {
      this.initDataForm(new User());
      this.formModal.show(template);
  }

  submitForm() : void {

  }

  // Init form values.
  initDataForm(user : User) {
    // Init form.
    this.formModal =  new FormModal(
                        this.modalService,
                        this.formBuilder.group({
                          id: [
                            user.id
                          ],
                          idRole: [
                            user.idRole, 
                            [Validators.required]
                          ],
                          login: [
                            user.login, 
                            [
                              Validators.required, 
                              Validators.minLength(3)
                            ]
                          ],
                          password: [
                            user.password, 
                            [
                              Validators.required, 
                              Validators.minLength(3)
                            ]
                          ],
                          confirmPassword: [
                            user.password, 
                            [
                              Validators.required, 
                              Validators.minLength(3)
                            ]
                          ],
                          name: [
                            user.name, 
                            [
                              Validators.required, 
                              Validators.minLength(3)
                            ]
                          ]
                        })
                      );
  }

}
