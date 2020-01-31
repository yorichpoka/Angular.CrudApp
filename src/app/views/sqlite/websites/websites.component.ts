import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { ETypeNotify } from 'src/app/enums/typenotify';
import { SessionService } from 'src/app/services/session.service';
import { WebSiteModel } from 'src/app/models/sqlite/webSite.model';
import { WebSitesService } from 'src/app/services/sqlite/webSites.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebSitesComponent implements OnInit {

  objAddOrUpdated                                             : WebSiteModel = new WebSiteModel();
  loadingDeleteButton                                         : LoadingButton = new LoadingButton();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid : DxDataGridComponent;
  webSitesDataSource                                             : CustomStore;
  selectedItemKeys                                            : any[] = [];
  notifyDuration                                              : number;

  /**
   * 
   * @param webSitesService 
   * @param sessionService 
   */
  constructor(
    private webSitesService : WebSitesService,
    private sessionService : SessionService) {
    this.notifyDuration = this.sessionService.getAppSetting().config.notifyDuration;
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
    this.webSitesDataSource = new CustomStore({
      key: "key",
      load: () => {
        return this.webSitesService.readAll()
                                      .then(l => {
                                        console.log(l);
                                        return l;
                                      });
      },
      insert: (webSite : WebSiteModel) => {
        return this.webSitesService.create(webSite)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      update: (key : number, webSite : WebSiteModel) => {
        return this.webSitesService.update(key, webSite)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      remove: (key : number) => {
        return this.webSitesService.delete(key)
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
            this.webSitesService.deleteArray(this.selectedItemKeys)
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

}
