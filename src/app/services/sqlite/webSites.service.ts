import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWebSitesService } from 'src/app/interfaces/sqlite/websites.service.interface';
import { SessionService } from '../session.service';
import { WebSiteModel } from 'src/app/models/sqlite/webSite.model';

@Injectable({
  providedIn: 'root'
})
export class WebSitesService implements IWebSitesService {

  private _urlResource : string = '/sqlite/webSites/';
  private _urlApi      : string;

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
  }

  create(obj: WebSiteModel): Promise<WebSiteModel> {
    return this.http
               .post<WebSiteModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: number): Promise<WebSiteModel> {
    return  this.http
                .get<WebSiteModel>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  readAll(): Promise<WebSiteModel[]> {
    return  this.http
                .get<WebSiteModel[]>(this._urlApi + this._urlResource)
                .toPromise();
  }

  update(id : number, obj: WebSiteModel): Promise<void> {
    return  this.http
                .put<void>(this._urlApi + this._urlResource + id, obj)
                .toPromise();
  }

  delete(id: number): Promise<void> {
    return  this.http
                .delete<void>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  deleteArray(ids: number[]): Promise<void> {
    return this.http
               .delete<void>(this._urlApi + this._urlResource + 'Array?' + ids.map(l => `id=${l}`).join('&'))
               .toPromise();
  }

}
