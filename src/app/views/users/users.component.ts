import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store'
import { DxDataGridComponent } from 'devextreme-angular';
import { Role } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { EComponent } from 'src/app/enums/component.enum';
import { BaseViewComponent } from 'src/app/helpers/base.viewcomponent.helper';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseViewComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  // usersDataSource : DataSource;
  usersDataSource : ArrayStore;
  rolesDataSource : Role[];
  errorMessage    : string;
  selectedRow     : Array<number>;
  selectedItemKeys: any[] = [];

  constructor(
    private usersService : UsersService,
    private rolesService : RolesService) {
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
      this.selectedItemKeys.forEach((key) => {
          this.usersDataSource.remove(key);
      });
      this.dataGrid.instance.refresh();
  }

}
