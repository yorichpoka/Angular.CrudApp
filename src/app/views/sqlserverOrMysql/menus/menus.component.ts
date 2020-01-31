import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuModel } from 'src/app/models/menu.model';
import { HttpErrorResponse } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { GroupMenuModel } from 'src/app/models/groupMenu.model';
import { GroupMenusService } from 'src/app/services/groupMenus.service';
import { MenusService } from 'src/app/services/menus.service';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { ValidationRule } from 'src/app/helpers/validationRule.helper';
import { ETypeNotify } from 'src/app/enums/typenotify';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  objAddOrUpdated                                             : MenuModel = new MenuModel();
  loadingDeleteButton                                         : LoadingButton = new LoadingButton();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid : DxDataGridComponent;
  menusDataSource                                             : CustomStore;
  groupMenusDataSource                                        : GroupMenuModel[];
  selectedItemKeys                                            : any[] = [];
  validationRule                                              : ValidationRule = new ValidationRule("^[a-zA-Z0-9]{3,}$");
  notifyDuration                                              : number;

  /**
   * 
   * @param menusService 
   * @param groupMenusService 
   * @param sessionService 
   */
  constructor(
    private menusService : MenusService,
    private groupMenusService : GroupMenusService,
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
    this.menusDataSource = new CustomStore({
      key: "id",
      load: () => {
        return this.menusService.readAll();
      },
      insert: (menu : MenuModel) => {
        return this.menusService.create(menu)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      update: (key : number, menu : MenuModel) => {
        return this.menusService.update(key, menu)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      remove: (key : number) => {
        return this.menusService.delete(key)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      }
    });
    this.loadGroupMenusDataSource();
  }

  /**
   * Load groupMenus.
   */
  loadGroupMenusDataSource(): void {
    this.groupMenusService
      .readAll()
      .then(
        (data: GroupMenuModel[]) => {
          this.groupMenusDataSource = data;
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
            this.menusService.deleteArray(this.selectedItemKeys)
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
    this.menusService.onMenuCreated.subscribe(
      () => {
        this.menusDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.menusService.onMenuUpdated.subscribe(
      () => {
        this.menusDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.menusService.onMenuDeleted.subscribe(
      () => {
        this.menusDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.menusService.onMenusDeleted.subscribe(
      () => {
        this.menusDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
  }

}
