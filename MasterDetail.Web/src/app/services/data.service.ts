import { AppErrorBadInput } from './../common/app-error-bad-input';
import { AppErrorNotFound  } from './../common/app-error-notfound';
import { AppError } from './../common/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(resource) {
    return this.http.post(this.url,  resource)
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .map(response => response.json())      
      .catch(this.handleError);
  }

  delete(resource) {
    return this.http.post(this.url + '/Delete',resource)
      //.map(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new AppErrorBadInput(error.json()));
  
    if (error.status === 404)
      return Observable.throw(new AppErrorNotFound());
    
    return Observable.throw(new AppError(error));
  }
}
