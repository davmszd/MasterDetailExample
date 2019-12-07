import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Http } from '@angular/http';
import { PersonService } from 'src/app/services/person.service';
import { AppError } from 'src/app/Common/app-error';
import { AppErrorNotFound } from 'src/app/Common/app-error-notfound';
import { PersonAddComponent } from 'src/app/person-add/person-add.component';
import { Observable } from 'rxjs';
import { PersonDataSource } from 'src/app/person/person.component.datasource';
import { tap } from 'rxjs/internal/operators/tap';
import { merge, fromEvent } from "rxjs";




@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, AfterViewInit {
  //persons: Person[];
  personPosts: PersonPost[];
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //progressbar
  progress: number = 0;
  timer;
  isLoading: boolean = false;
  pageSizeOptions: number[] = [2, 3, 4,10,20];
  showFirstLastButtons: boolean = true;


  //page: number;
  //pageSize: number;
  totalCount: number ;

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //paging
  displayedColumns: string[] = ['name', 'family', 'nationalCode', 'subscribed', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //dataSource: MatTableDataSource<Person> = new MatTableDataSource();
  dataSource: PersonDataSource;
  //renderedData: Observable<any>;
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  constructor(private personService: PersonService, private MatDialog: MatDialog) {
  }
  ngOnInit() {
    console.log('ngOnInit');

    //console.log('ngOnInit this.paginator.pageSize ' + this.paginator.pageSize);
    //console.log('ngOnInit this.paginator.pageIndex ' + this.paginator.pageIndex);
    //this.paginator.pageSize = 2;
    //this.paginator.pageSize = 0;
    this.dataSource = new PersonDataSource(this.personService);
  }

  ngAfterViewInit() {
    this.dataSource.getPaged('name', 'asc', 0, this.pageSizeOptions[0]);
    this.paginator.page
      .pipe(
        tap(() => {
          this.dataSource.getPaged( '', 'asc', this.paginator.pageIndex, this.paginator.pageSize);
        })
      )
      .subscribe();
  }
  //##############################################
  confirm(arg1) {
    console.log('confirm ' + arg1);

  }
  cancel(arg2) {
    console.log('cancel ' + arg2);
  }
  //##############################################
  //PersonPost CRUD
  setPersonPost(thePersonPostList: any) {
    this.personPosts = thePersonPostList;
  }

  onPersonPostChanged(eventArgs: PersonPost) {
    console.log('PersonPostChangedEventArgs ' + eventArgs.name + eventArgs.description);
  }

  onPersonPostDeleted(eventArgs: PersonPost) {
    let index = this.personPosts.indexOf(eventArgs);
    this.personPosts.splice(index, 1);
  }

  onPersonPostAdded(eventArgs: PersonPost) {
    this.personPosts.splice(0, 0, eventArgs);
  }
  //######################################################
  //######################################################
  //######################################################
  //Person CRUD
  //Add Person With Modal
  openDialog() {
    this.MatDialog.open(PersonAddComponent, {
      data: { Id: 1 },
      width: '600px',
      height: '600px', })
      .afterClosed()
      .subscribe(result => {
        console.log({ result });
        this.isLoading = true;
        this.dataSource.getPaged('name', 'asc', 0, this.pageSizeOptions[0]);
      });
  }

  //######################################################
  //######################################################
  //######################################################
  //Delete Person
  deletePerson(person: Person) {
    console.log('deletePerson ' + person.id);
    person.isDeleted = true;
    this.personService.delete(person).subscribe(() => {
      this.dataSource.getPaged('name', 'asc', 0, this.pageSizeOptions[0]);
    }, (error: AppError) => {
      if (error instanceof AppErrorNotFound) {
        alert('this post has already been deleted.');
      }
      else {
        throw error;
      }
    });
  }
  //######################################################
  //######################################################
  //######################################################
  //Create Person
  savePerson(person: Person) {
    console.log('savePerson ' + person);
    person.isEdited = true;
    this.personService.create(person).subscribe((updatedPerson) => {
      this.personService.getAll().subscribe(persons => {
        //this.persons = persons;
        this.dataSource = persons;
      });
    });
  }
}


export class Entity implements IEntity {
  isNew: boolean;
  isEdited: boolean;
  isDeleted: boolean;
}

export interface IEntity{
  isNew: boolean;
  isEdited: boolean;
  isDeleted: boolean;
}

export class Person extends Entity implements IPerson {
  id: string;
  name: string;
  family: string;
  nationalCode: string;
  subscribed: string;
  maritalstatus: MaritalStatus;
  thePersonPostList: PersonPost[];
}
export interface IPerson {
  id: string;
  name: string;
  family: string;
  nationalCode: string;
  subscribed: string;
  maritalstatus: MaritalStatus;
  thePersonPostList: PersonPost[];
}

export class PersonPost extends Entity implements IPersonPost {
  id: string;
  name: string;
  description: string;
  thePersonPostDetailList: PersonPostDetail[];
}

export interface IPersonPost {
  id: string;
  name: string;
  description: string;
  thePersonPostDetailList: PersonPostDetail[];
}

export class PersonPostDetail extends Entity implements IPersonPostDetail {
  id: string;
  fromDate: string;
  toDate: string;
}

export interface IPersonPostDetail {
  id: string;
  fromDate: string;
  toDate: string;
}


export enum MaritalStatus {
  None = 0,
  Single = 1,
  Married = 2,
}
