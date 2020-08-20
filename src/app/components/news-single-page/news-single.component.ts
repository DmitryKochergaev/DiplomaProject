import {Component, OnInit} from '@angular/core';
import {News} from "../../shared/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {NewsService} from "../../shared/news.service";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.css']
})
export class NewsSingleComponent implements OnInit {

  news$: Observable<News>

  constructor(private route: ActivatedRoute, private newsService: NewsService) {
  }

  ngOnInit() {
    this.news$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.newsService.getById(params['id'])
      }))
  }
}
