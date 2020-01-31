import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { IRestaurantsService } from 'src/app/interfaces/mongodb/restaurants.service.interface';
import { RestaurantModel } from 'src/app/models/mongodb/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService implements IRestaurantsService {

  private _urlResource : string = '/mongodb/restaurants/';
  private _urlApi      : string;

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
  }

  create(obj: RestaurantModel): Promise<RestaurantModel> {
    return this.http
               .post<RestaurantModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: string): Promise<RestaurantModel> {
    return  this.http
                .get<RestaurantModel>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  readAll(): Promise<RestaurantModel[]> {
    return  this.http
                .get<RestaurantModel[]>(this._urlApi + this._urlResource + `top/999999999`)
                .toPromise();
  }

  update(id : string, obj: RestaurantModel): Promise<void> {
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
