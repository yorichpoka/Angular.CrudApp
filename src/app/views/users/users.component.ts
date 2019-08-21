import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import ArrayStore from 'devextreme/data/array_store'
import { DxDataGridComponent } from 'devextreme-angular';
import { Role } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { FormModal } from 'src/app/helpers/formmodal.helper';
import { confirm } from 'devextreme/ui/dialog';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { EFaIcon } from 'src/app/enums/faicon.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  formModal                                                   : FormModal;
  objAddOrUpdated                                             : User = new User();
  loadingButton                                               : LoadingButton = new LoadingButton('Save', EFaIcon.Check, 'Saving');
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid : DxDataGridComponent;
  usersDataSource                                             : ArrayStore;
  rolesDataSource                                             : Role[];
  selectedItemKeys                                            : any[] = [];

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadUsersDataSource()
        .finally(
          () => {
            this.loadRolesDataSource();
          }
        );
  }

  loadUsersDataSource(): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.usersService
          .readAll()
          .then(
            (dataUsers: User[]) => {
              this.usersDataSource = new ArrayStore({
                key: "id",
                data: dataUsers
              });
              resolve();
            },
            (reason : any) => {
              reject(reason);
            }
          );
      }
    );
  }

  loadRolesDataSource(): void {
    this.rolesService
      .readAll()
      .then(
        (data: Role[]) => {
          this.rolesDataSource = data;
        }
      );
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  deleteRecords() {
    Utils.confirmdAction()
      .then(
        (isTrue: boolean) => {
          if (isTrue) {
            this.selectedItemKeys.forEach((key) => {
              this.usersDataSource.remove(key);
            });
            this.dataGrid.instance.refresh();
          }
        }
      );
  }

  newRecord(template: TemplateRef<any>): void {
    this.objAddOrUpdated = new User();
    this.initDataForm();
    this.formModal.show(template);
  }

  submitForm(): void {
    Utils.confirmdAction()
          .then(
            (isTrue : boolean) => {
              if(isTrue) {
                this.loadingButton.start();
                if(this.objAddOrUpdated.id === 0) {
                  this.usersService
                      .create(this.objAddOrUpdated)
                      .then(
                        (dataUser : User) => {
                          return null;
                        },
                        (reason : HttpErrorResponse) => {
                          return reason;
                        }
                      )
                      .then(
                        (errorResponse : HttpErrorResponse) => {
                          this.loadingButton.stop();
                          if(errorResponse == null) {
                            this.loadUsersDataSource()
                                .finally(
                                  () => {
                                    this.formModal.hide();
                                  }
                                );
                          } else {

                          }
                        }
                      )
                } else {

                }
              }
            }
          );
  }

  // Init form values.
  initDataForm() {
    // Init form.
    this.formModal = new FormModal(
      this.modalService,
      this.formBuilder.group({
        id: [
          this.objAddOrUpdated.id
        ],
        idRole: [
          this.objAddOrUpdated.idRole,
          [Validators.required]
        ],
        login: [
          this.objAddOrUpdated.login,
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        password: [
          this.objAddOrUpdated.password,
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        confirmPassword: [
          this.objAddOrUpdated.password,
          [
            Validators.required,
            Validators.minLength(3),
            Utils.validatorMatchValue('password')
          ]
        ],
        name: [
          this.objAddOrUpdated.name,
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ]
      })
    );
  }

}
