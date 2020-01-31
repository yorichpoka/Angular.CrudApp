import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import * as Utils from 'src/app/helpers/utils.helper';
import { LoadingButton } from 'src/app/helpers/loadingButton.helper';
import { ETypeNotify } from 'src/app/enums/typenotify';
import { SessionService } from 'src/app/services/session.service';
import { RestaurantModel } from 'src/app/models/mongodb/restaurant.model';
import { RestaurantsService } from 'src/app/services/mongodb/restaurants.service';
import { GradeModel } from 'src/app/models/mongodb/grade.model';
import { CustomStoreHelper } from 'src/app/helpers/customStore.helper';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  objAddOrUpdated                                             : RestaurantModel = new RestaurantModel();
  loadingDeleteButton                                         : LoadingButton = new LoadingButton();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid : DxDataGridComponent;
  restaurantsDataSource                                       : CustomStore;
  gradesDataSourceArray                                       : CustomStore[] = [];
  gradesDataSource                                            : CustomStore;
  selectedItemKeys                                            : any[] = [];
  notifyDuration                                              : number;
  private _index                                              : number = 0;

  /**
   * 
   */
  getIndex() : number {
    return this._index ++;
  }

  /**
   * 
   * @param restaurantsService 
   * @param sessionService 
   */
  constructor(
    private restaurantsService : RestaurantsService,
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
    this.restaurantsDataSource = new CustomStore({
      key: "restaurant_Id",
      load: () => {
        return this.restaurantsService.readAll()
                                      .then(
                                        (data : RestaurantModel[]) => {
                                          // ...
                                          data.forEach(l => {
                                            // ...
                                            this.gradesDataSourceArray.push(
                                              this.getDataSourceForGrade(l)
                                            );
                                          });

                                          return data;
                                        }
                                      );
      },
      insert: (restaurant : RestaurantModel) => {
        return this.restaurantsService.create(restaurant)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      update: (key : string, restaurant : RestaurantModel) => {
        return this.restaurantsService.update(key, restaurant)
                                .catch(
                                  (reason : HttpErrorResponse) => {
                                    // Notification
                                    Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                  }
                                );
      },
      remove: (key : string) => {
        return this.restaurantsService.delete(key)
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
            this.restaurantsService.deleteArray(this.selectedItemKeys)
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

  /**
   * 
   * @param restaurant 
   */
  getDataSourceGrade(restaurant : RestaurantModel) : any {
    /*
    this.gradesDataSourceArray.push(
      new CustomStore({
        key: "grade_Id",
        load: () => {
          return restaurant.grades;
        },
        insert: (restaurant : RestaurantModel) => {
          return this.restaurantsService.create(restaurant)
                                  .catch(
                                    (reason : HttpErrorResponse) => {
                                      // Notification
                                      Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                    }
                                  );
        },
        update: (key : string, restaurant : RestaurantModel) => {
          return this.restaurantsService.update(key, restaurant)
                                  .catch(
                                    (reason : HttpErrorResponse) => {
                                      // Notification
                                      Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                    }
                                  );
        },
        remove: (key : string) => {
          return this.restaurantsService.delete(key)
                                  .catch(
                                    (reason : HttpErrorResponse) => {
                                      // Notification
                                      Utils.notification(reason.error, ETypeNotify.Error, this.notifyDuration);
                                    }
                                  );
        }
      })
    );
    */
    var gradesDataSource =  new CustomStore({
                              key: "grade_Id",
                              load: () => {
                                return restaurant.grades;
                                /*
                                return  new Promise<GradeModel[]>(
                                          (resolve, reject) => {

                                            console.warn(restaurant.grades);
                                            resolve(restaurant.grades);
                                          }
                                        );
                                */
                              },
                              insert: (grade : GradeModel) => {
                                // Add in list
                                restaurant.grades.push(grade);

                                return restaurant.grades;
                                /*
                                return  new Promise<GradeModel[]>(
                                          (resolve, reject) => {
                                            // Add in list
                                            restaurant.grades.push(grade);

                                            console.warn(restaurant.grades);
                                            resolve(restaurant.grades);
                                          }
                                        );
                                */
                              },
                              update: (key : string, grade : GradeModel) => {
                                return null;
                                /*
                                return  new Promise<GradeModel[]>(
                                          (resolve, reject) => {
                                            // Get index
                                            var index = restaurant.grades.findIndex(l => l.grade_Id == key);
                                            // Update value
                                            if (grade.date)
                                              restaurant.grades[index].date = grade.date;
                                            if (grade.name)
                                              restaurant.grades[index].name = grade.name;
                                            if (grade.score)
                                              restaurant.grades[index].score = grade.score;

                                            console.warn(restaurant.grades);
                                            resolve();
                                          }
                                        );
                                */
                              },
                              remove: (key : string) => {
                                return null;
                                /*
                                return  new Promise<GradeModel[]>(
                                          (resolve, reject) => {
                                            // Get index
                                            var index = restaurant.grades.findIndex(l => l.grade_Id == key);
                                            restaurant.grades.splice(index, 1);

                                            console.warn(restaurant.grades);
                                            resolve();
                                          }
                                        );
                                */
                              }
                            });

    return restaurant.grades;
  }

  /**
   * 
   * @param restaurant 
   */
  getDataSourceForGrade(restaurant : RestaurantModel) : CustomStore {
   var dataSource : CustomStore = new CustomStore({
                                    key: "grade_Id",
                                    load: () => {
                                      return  new Promise<GradeModel[]>(
                                                (resolve, reject) => {

                                                  console.warn(restaurant.grades);
                                                  resolve(restaurant.grades);
                                                }
                                              );
                                    },
                                    insert: (grade : GradeModel) => {
                                      return  new Promise<GradeModel[]>(
                                                (resolve, reject) => {
                                                  // Add in list
                                                  restaurant.grades.push(grade);

                                                  console.warn(restaurant.grades);
                                                  resolve(restaurant.grades);
                                                }
                                              );
                                    },
                                    update: (key : string, grade : GradeModel) => {
                                      return  new Promise<GradeModel[]>(
                                                (resolve, reject) => {
                                                  // Get index
                                                  var index = restaurant.grades.findIndex(l => l.grade_Id == key);
                                                  // Update value
                                                  if (grade.date)
                                                    restaurant.grades[index].date = grade.date;
                                                  if (grade.name)
                                                    restaurant.grades[index].name = grade.name;
                                                  if (grade.score)
                                                    restaurant.grades[index].score = grade.score;

                                                  console.warn(restaurant.grades);
                                                  resolve();
                                                }
                                              );
                                    },
                                    remove: (key : string) => {
                                      return  new Promise<GradeModel[]>(
                                                (resolve, reject) => {
                                                  // Get index
                                                  var index = restaurant.grades.findIndex(l => l.grade_Id == key);
                                                  restaurant.grades.splice(index, 1);

                                                  console.warn(restaurant.grades);
                                                  resolve();
                                                }
                                              );
                                    }
                                  });
    return dataSource;
  }

  onRowUpdated(data : any, restaurant_Id : string) : any {
    console.warn(data.data);
    console.warn(restaurant_Id);
  }

  onRowInserted(data : any, restaurant_Id : string) : any {
    console.warn(data.data);
    console.warn(restaurant_Id);
  }

  onRowRemoved(data : any, restaurant_Id : string) : any {
    console.warn(data.data);
    console.warn(restaurant_Id);
  }
  
}
