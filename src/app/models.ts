
export interface API {

    key: string,
    id?: number

}

export interface COUNTRY {

    flag: string,
    code: string,
    name: string

}

export interface COUNTRYLIST {

    countries: COUNTRY[],

}