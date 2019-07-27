import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/impl/users.service';
import { User } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store'
import { DxDataGridComponent } from 'devextreme-angular';
import { Role } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/impl/roles.service';
import { BaseComponent } from 'src/app/helpers/base.component';
import { EComponent } from 'src/app/models/enums/component.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent implements OnInit {

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
    this.usersService.readAll().subscribe(
      // Next.
      (data : User[]) => {
        // this.usersDataSource = new DataSource({ store: { type: 'array', key: 'id', data: data }});
        this.usersDataSource = new ArrayStore({
          key: "id",
          data: data
        });
        this.selectedRow = [1];
      },
      // Error.
      (error : HttpErrorResponse) => {
        this.errorMessage = error.message;
      },
      // Complete.
      () => {
        console.log('Complete : "usersService.readAll"');
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
