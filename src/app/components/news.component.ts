import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API, COUNTRY } from '../models';
import { MyNewsAppDB } from '../newsappdb';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private http: HttpClient, private db: MyNewsAppDB) { }

  country: COUNTRY
  news: []

  ngOnInit(): void {

    this.country = { name: this.activatedroute.snapshot.params.country, code: this.activatedroute.snapshot.params.code }
    this.db.retrieveCountry(this.country).then(info => {

      
      if(info[0].news == undefined || this.getElapsedTime(info[0].date) > 5){

        console.log("no articles in cache. Making request from NewsAPI");
        this.db.getApi().then(api => 
          
        {
          this.retrieveNewsViaExpress(api[0].key, this.country.code).then(result => {
              
              this.news = result.articles.map(v => {return {source: v.source, author: v.author, title: v.title, description: v.description, url: v.url, image: v.urlToImage, publishedAt: v.publishedAt, content: v.content}})
              this.country.news = this.news;
              this.country.date = new Date();
              this.db.saveArticles(this.country).then(_ => console.log("storing articles in db")).catch(e => console.log(e))

          }).catch(e => console.log(e))
        })

      }
      else{
        console.log("retrieving articles from cache")
        this.news = info[0].news
      }

    })

  }


  retrieveNews(key, code){

    const baseURL = 'https://newsapi.org/v2/top-headlines?';
    const headers = new HttpHeaders({'X-Api-Key': key})
    const params = new HttpParams().set('country', code).set('category', 'general').set('pageSize', '30')
    return this.http.get(baseURL, {headers, params}).toPromise()

  }

  retrieveNewsViaExpress(key, code){ 

    const params = new HttpParams().set('country', code);
    const headers = new HttpHeaders({'X-Api-Key': key})
    return this.http.get<any>('/api/news', {headers, params}).toPromise()
  }


  getElapsedTime(date: Date) {
    const now = new Date();
    const millisecondsElapsed = now.getTime() - date.getTime();
    const minsElapsed = millisecondsElapsed/(1000*60);
    return minsElapsed
  }

}
