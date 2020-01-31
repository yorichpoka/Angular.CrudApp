import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { ICoordinatesService } from 'src/app/interfaces/mongodb/coordinates.service.interface';
import { CoordinateModel } from 'src/app/models/mongodb/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService implements ICoordinatesService {

  private _urlResource : string = '/mongodb/coordinates/';
  private _urlApi      : string;

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
  }

  create(obj: CoordinateModel): Promise<CoordinateModel> {
    return this.http
               .post<CoordinateModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: string): Promise<CoordinateModel> {
    return  this.http
                .get<CoordinateModel>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  readAll(): Promise<CoordinateModel[]> {
    return  this.http
                .get<CoordinateModel[]>(this._urlApi + this._urlResource)
                .toPromise();
  }

  update(id : string, obj: CoordinateModel): Promise<void> {
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
