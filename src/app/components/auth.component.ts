import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API } from '../models';
import { MyNewsAppDB } from '../newsappdb';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //Attributes
  authForm: FormGroup
  API: API

  constructor(private fb: FormBuilder, private db: MyNewsAppDB, private router: Router) { }

  ngOnInit(): void {

    //The form has to be made first, because the view is rendered first. As getting api key via the promise will take some time, the view will throw an error that it has no controls. 
    this.authForm = this.makeForm();
    this.db.getApi().then(result => {

      //this.authForm = this.makeForm(); the form cannot be made here as the view is rendered first. 
      this.API = result[0];
      if(this.API != undefined){
        this.authForm.get('key').setValue(this.API.key)

      }

    }).catch(e => {console.log(e)})
    //this.API = {key: "Lalala"}

  }


  //Methods
  makeForm() {
    return this.fb.group({
      key: this.fb.control('', [Validators.required])
    })
  }

  onSave(){
    this.API = this.authForm.value
    //console.log(this.API)
    this.db.saveApi(this.API)
    this.router.navigate(['/countries'])
  }

  onDelete(){
    this.db.deleteApi(this.API);
    this.authForm.reset();
  }

}
