import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorizationModel } from 'src/app/models/authorization.model';
import { HttpErrorResponse } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { RoleModel } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { ValidationRule } from 'src/app/helpers/validationRule.helper';
import { ETypeNotify } from 'src/app/enums/typenotify';
import { SessionService } from 'src/app/services/session.service';
import { MenuModel } from 'src/app/models/menu.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.component.html',
  styleUrls: ['./authorizations.component.css']
})
export class AuthorizationsComponent implements OnInit {

  objAddOrUpdated                                             : AuthorizationModel = new AuthorizationModel();
  loadingDeleteButton                                         : LoadingButton = new LoadingButton();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid : DxDataGridComponent;
  authorizationsDataSource                                    : CustomStore;
  rolesDataSource                                             : RoleModel[];
  menusDataSource                                             : MenuModel[];
  selectedItemKeys                                            : any[] = [];
  validationRule                                              : ValidationRule = new ValidationRule("^[a-zA-Z0-9]{3,}$");
  notifyDuration                                              : number;

  /**
   * 
   * @param authorizationsService 
   * @param rolesService 
   * @param menusService 
   * @param sessionService 
   */
  constructor(
    private authorizationsService : AuthorizationsService,
    private rolesService : RolesService,
    private menusService : MenusService,
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
    this.authorizationsDataSource = new CustomStore({
      key: "id",
      load: () => {
        return this.authorizationsService.readAll();
      },
      insert: (authorization : AuthorizationModel) => {
        return this.authorizationsService.create(authorization)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      update: (key : string, authorization : AuthorizationModel) => {
        return this.authorizationsService.update(key, authorization)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      remove: (key : string) => {
        return this.authorizationsService.delete(key)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      }
    });
    this.loadRolesDataSource();
    this.loadMenusDataSource();
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
   * Load menus.
   */
  loadMenusDataSource(): void {
    this.menusService
      .readAll()
      .then(
        (data: MenuModel[]) => {
          this.menusDataSource = data;
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
            this.authorizationsService.deleteArray(this.selectedItemKeys)
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
    this.authorizationsService.onAuthorizationCreated.subscribe(
      () => {
        this.authorizationsDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.authorizationsService.onAuthorizationUpdated.subscribe(
      () => {
        this.authorizationsDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.authorizationsService.onAuthorizationDeleted.subscribe(
      () => {
        this.authorizationsDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.authorizationsService.onAuthorizationsDeleted.subscribe(
      () => {
        this.authorizationsDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
  }

}
