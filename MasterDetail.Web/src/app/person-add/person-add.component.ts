import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PersonService } from 'src/app/services/person.service';
import { MaritalStatus, Person } from 'src/app/person/person.component';

//e: \projects\masterdetail\masterdetail.web\src\app\person\person.component.ts
//export const DIALOG_DATA = new InjectionToken('DIALOG_DATA');

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {
  person: Person = new Person();
  //maritalStatus = MaritalStatus.None;
  enmMaritalStatus = MaritalStatus;

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  constructor(public dialogRef: MatDialogRef<PersonAddComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private personService: PersonService) {
  }
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  ngOnInit() {
    
  }

  addPerson(personAddForm) {
    console.log(personAddForm.value);
    personAddForm.value['IsNew'] = true;
    this.personService.create(personAddForm.value).subscribe((updatedPerson) => {
      this.dialogRef.close();
    });
  }
}
