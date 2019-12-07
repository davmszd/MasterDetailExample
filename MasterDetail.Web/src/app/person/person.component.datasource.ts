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
  /*A BehaviorSubject is a Subject that can emit the current value (<< Subjects have no concept of current value>> )*/
  private personSubject = new BehaviorSubject<Person[]>([]);
  //#########################################################################
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  //#########################################################################
  private totalCountSubject = new BehaviorSubject<number>(0);
  public totalCountSubject$ = this.totalCountSubject.asObservable();
  //#########################################################################
  constructor(private personService: PersonService) {
  }

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

    this.personService
      .getPaged(filter, sortDirection, page, pageSize)
      .pipe(
              catchError(() => of([])),

             finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(persons => {

        console.log({ persons });

        this.page = persons['page'];

        this.pageSize = persons['pageSize'];

        this.totalCount = persons['totalCount'];

        this.totalCountSubject.next(this.totalCount);

        this.personSubject.next(persons['results']);
      });
  }
}
