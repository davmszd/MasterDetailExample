import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Http } from '@angular/http';
import { PersonService } from 'src/app/services/person.service';
import { AppError } from 'src/app/Common/app-error';
import { AppErrorNotFound } from 'src/app/Common/app-error-notfound';
import { PersonAddComponent } from 'src/app/person-add/person-add.component';



@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  persons: Person[];
  personPosts: PersonPost[];

  dataSource: any;
  displayedColumns: string[] = ['name', 'family', 'nationalCode', 'subscribed', 'action'];

  progress: number = 0;
  timer;
  isLoading: boolean = false;


  constructor(private personService: PersonService, private MatDialog: MatDialog) {
    this.isLoading = true;
    this.timer = setInterval(() => {
      this.progress++;
      if (this.progress == 100) {
        clearInterval(this.timer);
        //this.displayedColumns = ['name', 'family', 'nationalCode', 'subscribed', 'action'];
    
        this.personService.getAll().subscribe(persons => {
          this.persons = persons;
          this.dataSource = persons;
          this.isLoading = false;
        });
      }
    },20);
  }

  ngOnInit() {
    //this.displayedColumns = ['name', 'family', 'nationalCode', 'subscribed', 'action'];
    //
    //this.personService.getAll().subscribe(persons => {
    //  this.persons = persons;
    //  this.dataSource = persons;
    //  this.isLoading = false;
    //});
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
