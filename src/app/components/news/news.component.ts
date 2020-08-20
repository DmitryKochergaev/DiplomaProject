import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../shared/interfaces";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @Input() news: News

  constructor() { }

  ngOnInit() {
  }

}
