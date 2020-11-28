import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { API, COUNTRYLIST } from './models';

@Injectable()
export class MyNewsAppDB extends Dexie {

    api: Dexie.Table<API, number>;
    countryList: Dexie.Table<COUNTRYLIST, number>;

    constructor() {

        super("MyNewsAppDB")

        this.version(1).stores({
            api: '++id',
        })

        this.version(2).stores({
            api: '++id',
            countryList: '++id'
        })

        this.version(3).stores({
            api: '++id',
            countryList: '++id'
        })

        this.api = this.table('api');
        this.countryList = this.table('countryList');
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
    saveList(list: COUNTRYLIST) :Promise<any> {
        return this.countryList.add(list)
    }

    retrieveList() : Promise<COUNTRYLIST[]> {
        return this.countryList.toArray()
    }

}