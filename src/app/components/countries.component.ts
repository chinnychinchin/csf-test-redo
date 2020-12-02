import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { COUNTRY } from '../models';
import { MyNewsAppDB } from '../newsappdb';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  supportedConCodes = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'
  countryList: COUNTRY[]

  constructor(private http: HttpClient, private db: MyNewsAppDB) { }

  ngOnInit(): void {

    this.db.retrieveList().then(list => {

      //list == [{country1}, {country2}, {country3}]
      this.countryList = list
      
      if(list.length == 0){
        this.reqCountryList().then(result => {
          console.log("requesting list of countries from API...")
          //@ts-ignore
          this.countryList = result.map(c => { return { code: c.alpha2Code, name: c.name, flag: c.flag  } })
          this.db.saveList(this.countryList)
        })
      }
    })
    
  }


  //Methods
  reqCountryList() {
    const conCodesArray = this.supportedConCodes.split(" ");
    let baseURL = "https://restcountries.eu/rest/v2/alpha?codes="
    for(let i in conCodesArray) {
      baseURL = baseURL+ `${conCodesArray[i]};`
    }
    return this.http.get(baseURL).toPromise()
  }

}
