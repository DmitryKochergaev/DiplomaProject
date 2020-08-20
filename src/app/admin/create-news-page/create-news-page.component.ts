import {Component, OnInit} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {News} from "../../shared/interfaces"
import {NewsService} from "../../shared/news.service";
import {pipe} from "rxjs";

@Component({
    selector: "app-create-news-page",
    templateUrl: "./create-news-page.component.html",
    styleUrls: ["./create-news-page.component.css"]
})
export class CreateNewsPageComponent implements OnInit {
    form: FormGroup

    constructor(private newsService: NewsService) {
    }

    //TODO required

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            text: new FormControl(null, Validators.required),
        })
    }

    submit() {
        if (this.form.invalid) {
            return
        }

        const news: News = {
          title: this.form.value.title,
          text: this.form.value.text,
          date: new Date()
        }

        this.newsService.create(news).subscribe(() => {
          this.form.reset()
        })

    }
}
