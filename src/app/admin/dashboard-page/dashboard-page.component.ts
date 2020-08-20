import {Component, OnInit, OnDestroy} from '@angular/core';
import {CardService} from 'src/app/shared/card.service';
import {Card, Comment, News} from 'src/app/shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/components/services/alert.service';
import {NewsService} from "../../shared/news.service";
import {CommentService} from "../../shared/comment.service";

//TODO add pipe for news
//TODO reverse commetns

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  cards: Card[] = []
  news: News[] = []
  comments: Comment [] = []
  pSub: Subscription
  pSubNews: Subscription
  pSubComment: Subscription
  dSub: Subscription
  dSubNews: Subscription
  dSubComment: Subscription
  searchStr = ''
  changeView = '1'

  constructor(private cardService: CardService,
              private alertService: AlertService,
              private newsService: NewsService,
              private commentService: CommentService) {
  }

  ngOnInit() {
    // получаем карточки из БД
    this.pSub = this.cardService.getAll().subscribe(cards => {
      this.cards = cards
    })
    this.pSubNews = this.newsService.getAll().subscribe(news => {
      this.news = news
    })
    this.pSubComment = this.commentService.getAll().subscribe(comment => {
      this.comments = comment
    })
  }

  // удаляем карточку
  remove(id: string) {
    this.dSub = this.cardService.remove(id).subscribe(() => {
      this.cards = this.cards.filter(card => card.id != id)
      this.alertService.danger('Удалено')
    })
  }

  removeNews(id: string) {
    this.dSubNews = this.newsService.remove(id).subscribe(() => {
      this.news = this.news.filter(news => news.id != id)
    })
  }

  // отписываесмя от getAll после получения карточек, от потерь памяти
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.pSubNews) {
      this.pSubNews.unsubscribe()
    }

    if (this.pSubComment) {
      this.pSubComment.unsubscribe()
    }

    if (this.dSubNews) {
      this.dSubNews.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

  change(change: string) {
    this.changeView = change
  }
}
