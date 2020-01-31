import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupMenuModel } from 'src/app/models/groupMenu.model';
import { HttpErrorResponse } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { GroupMenusService } from 'src/app/services/groupMenus.service';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { ETypeNotify } from 'src/app/enums/typenotify';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-groupmenus',
  templateUrl: './groupmenus.component.html',
  styleUrls: ['./groupmenus.component.css']
})
export class GroupMenusComponent implements OnInit {

  objAddOrUpdated                                             : GroupMenuModel = new GroupMenuModel();
  loadingDeleteButton                                         : LoadingButton = new LoadingButton();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid : DxDataGridComponent;
  groupMenusDataSource                                        : CustomStore;
  selectedItemKeys                                            : any[] = [];
  notifyDuration                                              : number;

  /**
   * 
   * @param groupMenusService 
   * @param sessionService 
   */
  constructor(
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
    this.groupMenusDataSource = new CustomStore({
      key: "id",
      load: () => {
        return this.groupMenusService.readAll();
      },
      insert: (groupMenu : GroupMenuModel) => {
        return this.groupMenusService.create(groupMenu)
                                    .catch(
                                      (reason : HttpErrorResponse) => {
                                        // Notification
                                        Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                      }
                                    );
      },
      update: (key : number, groupMenu : GroupMenuModel) => {
        return this.groupMenusService.update(key, groupMenu)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      remove: (key : number) => {
        return this.groupMenusService.delete(key)
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
            this.groupMenusService.deleteArray(this.selectedItemKeys)
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
    this.groupMenusService.onGroupMenuCreated.subscribe(
      () => {
        this.groupMenusDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.groupMenusService.onGroupMenuUpdated.subscribe(
      () => {
        this.groupMenusDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.groupMenusService.onGroupMenuDeleted.subscribe(
      () => {
        this.groupMenusDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
    this.groupMenusService.onGroupMenusDeleted.subscribe(
      () => {
        this.groupMenusDataSource.load()
                            .then(
                              () => {
                                this.dataGrid.instance.refresh();
                              }
                            );
      }
    );
  }

}
