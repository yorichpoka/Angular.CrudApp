import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleModel } from 'src/app/models/role.model';
import { HttpErrorResponse } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { RolesService } from 'src/app/services/roles.service';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { ETypeNotify } from 'src/app/enums/typenotify';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  objAddOrUpdated                                             : RoleModel = new RoleModel();
  loadingDeleteButton                                         : LoadingButton = new LoadingButton();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid : DxDataGridComponent;
  rolesDataSource                                             : CustomStore;
  selectedItemKeys                                            : any[] = [];
  notifyDuration                                              : number;

  /**
   * 
   * @param rolesService 
   * @param sessionService 
   */
  constructor(
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
    this.rolesDataSource = new CustomStore({
      key: "id",
      load: () => {
        return this.rolesService.readAll();
      },
      insert: (role : RoleModel) => {
        return this.rolesService.create(role)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      update: (key : number, role : RoleModel) => {
        return this.rolesService.update(key, role)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      remove: (key : number) => {
        return this.rolesService.delete(key)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      }
    });
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
            this.rolesService.deleteArray(this.selectedItemKeys)
                             .then(
                               () => {
                                this.dataGrid.instance.refresh();
                               },
                               (reason : HttpErrorResponse) => {
                                // Notification
                                Utils.notification(JSON.stringify(reason.error, null, 1), ETypeNotify.Error, this.notifyDuration);
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

  customizeText(data : any) : string {
    return data ? data.value  ? (<number[]>data.value).length.toString()
                              : '0'
                : '0';
  }

  /**
   * 
   */
  private _registerOnHubServerEvents() : void {
    this.rolesService.onRoleCreated.subscribe(
      () => {
        this.rolesDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.rolesService.onRoleUpdated.subscribe(
      () => {
        this.rolesDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.rolesService.onRoleDeleted.subscribe(
      () => {
        this.rolesDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.rolesService.onRolesDeleted.subscribe(
      () => {
        this.rolesDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
  }

}
