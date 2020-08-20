import {Component} from "@angular/core"

//TODO width форма логина регестрации
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})


export class AppComponent {
  isEnter = false;
  isReg = false;

  constructor() {

  }

  Enter() {
    this.isEnter = true

  }

  Regestration() {
    this.isReg = true
  }
}

