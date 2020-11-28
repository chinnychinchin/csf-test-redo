import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute) { }

  country: string
  code: string

  ngOnInit(): void {

    this.country = this.activatedroute.snapshot.params.country;
    this.code = this.activatedroute.snapshot.params.code;

  }

}
