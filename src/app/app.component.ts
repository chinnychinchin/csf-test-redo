import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API } from './models';
import { MyNewsAppDB } from './newsappdb';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'csf-test-redo';
  API: API;

  constructor(private router: Router, private db: MyNewsAppDB) { }

  ngOnInit() {

    //Get API (if any) from database
    this.db.getApi().then(result => 
      
      {this.API = result[0]
      if(this.API == undefined){
        this.router.navigate(['/auth'])
      }
      else{this.router.navigate(['/countries'])}}

      ).catch(e => {this.router.navigate['/auth']})
    

  }

}
