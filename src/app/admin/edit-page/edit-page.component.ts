import {Component, OnInit, OnDestroy} from "@angular/core"
import {ActivatedRoute, Params} from "@angular/router"
import {CardService} from "src/app/shared/card.service"
import {switchMap} from "rxjs/operators"
import {Card} from "src/app/shared/interfaces"
import {FormGroup, FormControl, Validators} from "@angular/forms"
import {Subscription} from "rxjs"
import {AlertService} from "../shared/components/services/alert.service"

@Component({
    selector: "app-edit-page",
    templateUrl: "./edit-page.component.html",
    styleUrls: ["./edit-page.component.css"]
})
export class EditPageComponent implements OnInit, OnDestroy {

    form: FormGroup
    card: Card
    submitted = false
    uSub: Subscription

    constructor(private route: ActivatedRoute, private cardService: CardService, private alertService: AlertService) {
    }

    ngOnInit() {
        //получаем из текущего роута id карточки и её поля
        this.route.params
            .pipe(
                //изменяем стрим
                switchMap((params: Params) => {
                    return this.cardService.getById(params["id"])
                })
            ).subscribe((card: Card) => {
            this.card = card
            this.form = new FormGroup({
                title: new FormControl(card.title, Validators.required),
                pic: new FormControl(card.pic, Validators.required),
                text: new FormControl(card.text, Validators.required),
                type: new FormControl(card.type)
            })
        })
    }

    submit() {
        if (this.form.invalid) {
            return
        }

        this.submitted = true

        this.uSub = this.cardService.update({
            id: this.card.id,
            title: this.form.value.title,
            pic: this.form.value.pic,
            text: this.form.value.text,
            type: this.form.value.type,
            date: this.card.date

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
