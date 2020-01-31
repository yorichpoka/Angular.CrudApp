import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { IAddresssService } from 'src/app/interfaces/mongodb/address.service.interface';
import { AddressModel } from 'src/app/models/mongodb/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService implements IAddresssService {

  private _urlResource : string = '/mongodb/address/';
  private _urlApi      : string;

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
  }

  create(obj: AddressModel): Promise<AddressModel> {
    return this.http
               .post<AddressModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: string): Promise<AddressModel> {
    return  this.http
                .get<AddressModel>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  readAll(): Promise<AddressModel[]> {
    return  this.http
                .get<AddressModel[]>(this._urlApi + this._urlResource)
                .toPromise();
  }

  update(id : string, obj: AddressModel): Promise<void> {
    return  this.http
                .put<void>(this._urlApi + this._urlResource + id, obj)
                .toPromise();
  }

  delete(id: string): Promise<void> {
    return  this.http
                .delete<void>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  deleteArray(ids: string[]): Promise<void> {
    return this.http
               .delete<void>(this._urlApi + this._urlResource + 'Array?' + ids.map(l => `id=${l}`).join('&'))
               .toPromise();
  }

}
