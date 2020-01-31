import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { IGradesService } from 'src/app/interfaces/mongodb/grades.service.interface';
import { GradeModel } from 'src/app/models/mongodb/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradesService implements IGradesService {

  private _urlResource : string = '/mongodb/grades/';
  private _urlApi      : string;

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
  }

  create(obj: GradeModel): Promise<GradeModel> {
    return this.http
               .post<GradeModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: string): Promise<GradeModel> {
    return  this.http
                .get<GradeModel>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  readAll(): Promise<GradeModel[]> {
    return  this.http
                .get<GradeModel[]>(this._urlApi + this._urlResource)
                .toPromise();
  }

  update(id : string, obj: GradeModel): Promise<void> {
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
