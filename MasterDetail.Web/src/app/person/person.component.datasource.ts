import { DataSource } from "@angular/cdk/collections";
import { CollectionViewer } from "@angular/cdk/collections";

import { Person } from "src/app/person/person.component";
import { PersonService } from "src/app/services/person.service";

import { BehaviorSubject, of } from "rxjs";
import { map, catchError, finalize } from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";


export class PersonDataSource implements DataSource<Person> {

  public page: number;
  public pageSize: number;
  public totalCount: number;



  private personSubject = new BehaviorSubject<Person[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private personService: PersonService) { }

  connect(collectionViewer: CollectionViewer): Observable<Person[]> {
    return this.personSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.personSubject.complete();
    this.loadingSubject.complete();
  }

  getPaged(filter = '', sortDirection = 'asc', page, pageSize) {
    console.log('getPaged PersonDataSource');

    this.loadingSubject.next(true);

    this.personService.getPaged(filter, sortDirection, page, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(persons => {
        console.log({ persons });
        //firstRowOnPage: 1
        //lastRowOnPage: 5
        this.page = persons['page'];
        this.pageSize = persons['pageSize'];
        this.totalCount = persons['totalCount'];
        //pageCount: 2
        //pageSize: 5
        //results: (5)[{ … }, { … }, { … }, { … }, { … }]
        //totalCount: 9
        this.personSubject.next(persons['results']);
      });
  }
}
