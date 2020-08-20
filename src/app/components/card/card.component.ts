import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/shared/interfaces';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card

  //TODO text decoration none ??????????

  constructor() { }

  ngOnInit() {
  }

}
