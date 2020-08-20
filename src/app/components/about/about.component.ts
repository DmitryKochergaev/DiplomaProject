import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared/shared.service"



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  searchStr = ""
  iN = 5

  constructor(private search: SharedService) {

  }

  ngOnInit() {

  }
}
