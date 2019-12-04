import { Component, OnInit, Input , Output ,EventEmitter} from '@angular/core';
import { PersonPost } from 'src/app/person/person.component';



@Component({
  selector: 'app-personpost',
  templateUrl: './personpost.component.html',
  styleUrls: ['./personpost.component.css']
})
export class PersonpostComponent implements OnInit {

  @Output('change') change = new EventEmitter<PersonPost>();
  @Output('delete') delete = new EventEmitter<PersonPost>();
  @Output('add') add = new EventEmitter<PersonPost>();


  enabled: boolean = false;
  @Input('personPosts') personPosts: PersonPost[];
  onePersonPost: PersonPost = new PersonPost();

  constructor() {
  }

  ngOnInit() {
  }
  //##############################################
  confirm(arg1) {
  }
  cancel(arg2) {
    console.log('cancel '+arg2);

  }
  //##############################################

  setEditPersonPost(onePersonPost: PersonPost) {
    console.log(onePersonPost);
    onePersonPost.isEdited = true;
    this.onePersonPost = onePersonPost;
    this.enabled = true;
  }

  deletePersonPost(onePersonPost) {
    onePersonPost.isDeleted = true;
    this.onePersonPost = onePersonPost;
    this.delete.emit(this.onePersonPost);
  }

  editPersonPost() {
    this.onePersonPost.isEdited = true;
    this.change.emit(this.onePersonPost);
  }

  addPersonPost(personPostForm) {
    let newPersonPost: PersonPost = new PersonPost();
    newPersonPost.isNew = true;
    newPersonPost.name = personPostForm.value.name;
    newPersonPost.description = personPostForm.value.description;
    //newPersonPost.thePersonPostDetailList = personPostForm.value.thePersonPostDetailList;
    //################################################################
    this.onePersonPost = newPersonPost;
    this.add.emit(newPersonPost);
  }

  resetForm(personPostForm) {
    personPostForm.reset();
  }
}
