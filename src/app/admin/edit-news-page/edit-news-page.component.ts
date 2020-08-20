import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Card, News} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {CardService} from "../../shared/card.service";
import {AlertService} from "../shared/components/services/alert.service";
import {switchMap} from "rxjs/operators";
import {NewsService} from "../../shared/news.service";

@Component({
  selector: 'app-edit-news-page',
  templateUrl: './edit-news-page.component.html',
  styleUrls: ['./edit-news-page.component.css']
})

export class EditNewsPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  news: News
  submitted = false
  uSub: Subscription

  constructor(private route: ActivatedRoute, private newsService: NewsService, private alertService: AlertService) {
  }

  ngOnInit() {
    //получаем из текущего роута id карточки и её поля
    this.route.params
      .pipe(
        //изменяем стрим
        switchMap((params: Params) => {
          return this.newsService.getById(params["id"])
        })
      ).subscribe((news: Card) => {
      this.news = news
      this.form = new FormGroup({
        title: new FormControl(news.title, Validators.required),
        text: new FormControl(news.text, Validators.required),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.newsService.update({
      id: this.news.id,
      title: this.form.value.title,
      text: this.form.value.text,
      date: this.news.date

    }).subscribe(() => {
      this.submitted = false
      this.alertService.success("Пост был изменен")
    })


  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

}
