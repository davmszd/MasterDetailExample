import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Http } from '@angular/http';
import { PersonService } from 'src/app/services/person.service';
import { AppError } from 'src/app/Common/app-error';
import { AppErrorNotFound } from 'src/app/Common/app-error-notfound';
import { PersonAddComponent } from 'src/app/person-add/person-add.component';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, AfterViewInit {
  persons: Person[];
  personPosts: PersonPost[];


  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //progressbar
  progress: number = 0;
  timer;
  isLoading: boolean = false;
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //paging
  displayedColumns: string[] = ['name', 'family', 'nationalCode', 'subscribed', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Person> = new MatTableDataSource();
  renderedData: Observable<any>;
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  constructor(private personService: PersonService, private MatDialog: MatDialog) {
  }


  ngOnInit() {
    this.isLoading = true;
    this.dataSource.paginator = this.paginator;
    this.timer = setInterval(() => {
    this.progress++;
    if (this.progress == 100) {
    clearInterval(this.timer);
    this.personService.getAll().subscribe(persons => {
      this.persons = persons;
      this.dataSource = persons;
      this.isLoading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(persons);
      // it won't work properly if it is not wrapped in timeout
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
      this.renderedData = this.dataSource.connect();
    });
    }
    }, 20);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  //##############################################
  openDialog() {
    this.MatDialog.open(PersonAddComponent, { data: { Id : 1 } })
      .afterClosed()
      .subscribe(result => {
        console.log(result);
        this.isLoading = true;
        this.personService.getAll().subscribe(persons => {
          this.persons = persons;
          this.dataSource = persons;
          this.isLoading = false;
        });
      });
  }
  //##############################################
  confirm(arg1) {
    console.log('confirm ' + arg1);

  }
  cancel(arg2) {
    console.log('cancel ' + arg2);
  }
  //##############################################

  setPersonPost(thePersonPostList: any) {
    this.personPosts = thePersonPostList;
  }

  onPersonPostChanged(eventArgs: PersonPost) {
    console.log('PersonPostChangedEventArgs ' + eventArgs.name + eventArgs.description);
    //let index = this.personPosts.indexOf(eventArgs);
    //this.personPosts.splice(index, 1);
  }

  onPersonPostDeleted(eventArgs: PersonPost) {
    let index = this.personPosts.indexOf(eventArgs);
    this.personPosts.splice(index, 1);
  }

  onPersonPostAdded(eventArgs: PersonPost) {
    this.personPosts.splice(0, 0, eventArgs);
  }

  deletePerson(person: Person) {


    console.log('deletePerson ' + person.id);

    person.isDeleted = true;
    this.personService.delete(person).subscribe(() => {
      //let index = this.persons.indexOf(person);
      //this.persons.splice(index, 1);


      this.personService.getAll().subscribe(persons => {
        this.persons = persons;
        this.dataSource = persons;
        this.isLoading = false;
      });


    }, (error: AppError) => {
      if (error instanceof AppErrorNotFound) {
        alert('this post has already been deleted.');
      }
      else {
        throw error;
      }
    });
  }

  savePerson(person: Person) {
    console.log('savePerson ' + person);
    person.isEdited = true;
    this.personService.create(person).subscribe((updatedPerson) => {
      this.personService.getAll().subscribe(persons => {
        this.persons = persons;
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
  thePersonPostList: PersonPost[];
}
export interface IPerson {
  id: string;
  name: string;
  family: string;
  nationalCode: string;
  subscribed: string;
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
