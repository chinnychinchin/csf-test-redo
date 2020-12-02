import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { API, COUNTRY } from './models';

@Injectable()
export class MyNewsAppDB extends Dexie {

    api: Dexie.Table<API, number>;
    country: Dexie.Table<COUNTRY, string>;

    constructor() {

        super("MyNewsAppDB")

        this.version(1).stores({
            api: '++id',
            country: 'code'
        })

        this.api = this.table('api');
        this.country = this.table('country');
    }


    //API methods
    saveApi(api: API) :Promise<any> {
        return this.api.put(api)
    }

    getApi(): Promise<API []> {
        return this.api.toArray()
    }

    deleteApi(api: API): Promise<any> {

        if(api != undefined){
            return this.api.where('id').equals(api.id).delete()
        }       
    } 

    //CountryList methods
    saveList(list: COUNTRY[]) {
        for(let i of list) {
            this.country.add(i)
        }
    }

    retrieveList() : Promise<COUNTRY[]> {
        return this.country.toArray()
    }

    retrieveCountry(c: COUNTRY): Promise<COUNTRY[]> {
        return this.country.where('code').equals(c.code).toArray()
    }

    saveArticles(c: COUNTRY) : Promise<any> {
        return this.country.where('code').equals(c.code).modify(c)
    }



}