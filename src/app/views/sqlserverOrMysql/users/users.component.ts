import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { RoleModel } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { ValidationRule } from 'src/app/helpers/validationRule.helper';
import { ETypeNotify } from 'src/app/enums/typenotify';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  objAddOrUpdated                                             : UserModel = new UserModel();
  loadingDeleteButton                                         : LoadingButton = new LoadingButton();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid : DxDataGridComponent;
  usersDataSource                                             : CustomStore;
  rolesDataSource                                             : RoleModel[];
  selectedItemKeys                                            : any[] = [];
  validationRule                                              : ValidationRule = new ValidationRule("^[a-zA-Z0-9]{3,}$");
  notifyDuration                                              : number;

  /**
   * 
   * @param usersService 
   * @param rolesService 
   * @param sessionService 
   */
  constructor(
    private usersService : UsersService,
    private rolesService : RolesService,
    private sessionService : SessionService) {
    this.notifyDuration = this.sessionService.getAppSetting().config.notifyDuration;
    this._registerOnHubServerEvents();
  }

  /**
   * 
   * @param event 
   */
  onToolbarPreparing(event : any) : void {
    // #region Comment
    // event.toolbarOptions.items.unshift({
    //                             location: 'after',
    //                             widget: 'dxButton',
    //                             options: {
    //                                 icon: 'plus',
    //                                 text: 'Add a new row',
    //                                 onClick: () => {
    //                                   this.dataGrid.instance.addRow();
    //                                 }
    //                             }
    //                           });
    // #endregion
    event.toolbarOptions.items[1].options.onClick = () => {
                                            Utils.confirmdAction()
                                                 .then(
                                                    (isTrue: boolean) => {
                                                      if (isTrue) {
                                                        this.dataGrid.instance.saveEditData();
                                                      }
                                                    }
                                                  );
    }
  }

  /**
   * 
   */
  ngOnInit() {
    this.usersDataSource = new CustomStore({
      key: "id",
      load: () => {
        return this.usersService.readAll();
      },
      insert: (user : UserModel) => {
        return this.usersService.create(user)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      update: (key : number, user : UserModel) => {
        return this.usersService.update(key, user)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      remove: (key : number) => {
        return this.usersService.delete(key)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      }
    });
    this.loadRolesDataSource();
  }

  /**
   * Load roles.
   */
  loadRolesDataSource(): void {
    this.rolesService
      .readAll()
      .then(
        (data: RoleModel[]) => {
          this.rolesDataSource = data;
        }
      );
  }

  /**
   * 
   * @param data 
   */
  onSelectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  /**
   * Delete selected records.
   */
  deleteRecords() {
    Utils.confirmdAction()
      .then(
        (isTrue: boolean) => {
          if (isTrue) {
            this.loadingDeleteButton.start();
            this.usersService.deleteArray(this.selectedItemKeys)
                             .then(
                               () => {
                                this.dataGrid.instance.refresh();
                               },
                               (reason : HttpErrorResponse) => {
                                // Notification
                                Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                              }
                             )
                             .then(
                              () => {
                                this.loadingDeleteButton.stop();
                              }
                            );
          }
        }
      );
  }

  /**
   * 
   */
  private _registerOnHubServerEvents() : void {
    this.usersService.onUserCreated.subscribe(
      () => {
        this.usersDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.usersService.onUserUpdated.subscribe(
      () => {
        this.usersDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.usersService.onUserDeleted.subscribe(
      () => {
        this.usersDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.usersService.onUsersDeleted.subscribe(
      () => {
        this.usersDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
  }

}
