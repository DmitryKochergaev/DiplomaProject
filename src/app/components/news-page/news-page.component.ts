import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {News} from "../../shared/interfaces";
import {NewsService} from "../../shared/news.service";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  news$: Observable<News[]>
  constructor(private newsService: NewsService) {

  }

  ngOnInit() {
    this.news$ = this.newsService.getAll()
    let sum = z => z+'asd'
    console.log(sum(5))
  }

}
