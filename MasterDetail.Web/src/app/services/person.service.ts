import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Person } from 'src/app/person/person.component';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends DataService {
  constructor(http: Http) {
    super('/api/person', http);
    this.url = '/api/person';
  }

  getPaged(filter: string, sortOrder: string, page: number = 1, pageSize: number = 10): Observable<Person[]>  {

    console.log('getPaged PersonService');

    //return this.http.get(this.url, {
    //  params: new HttpParams().set('Filter', filter)
    //    .set('SortOrder', sortOrder)
    //    .set('PageNumber', pageSize.toString())
    //    .set('pageSize', pageNumber.toString())
    //})
    //  .map(response => response.json());
    if (page === 0) {
      page = 1;
    }
    return this.http.get(this.url, {
      params: {
        Filter: filter,
        SortOrder: sortOrder,
        page: page.toString(),
        pageSize: pageSize.toString(),
      }
    })
      .map(response => response.json());


  }
}
