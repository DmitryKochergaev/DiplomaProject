import {Component, OnInit} from "@angular/core"
import {FormGroup, FormControl, Validators} from "@angular/forms"
import {Card} from "src/app/shared/interfaces"
import {CardService} from "src/app/shared/card.service"
import {AlertService} from "../shared/components/services/alert.service"

@Component({
    selector: "app-create-page",
    templateUrl: "./create-page.component.html",
    styleUrls: ["./create-page.component.css"]
})
export class CreatePageComponent implements OnInit {
    form: FormGroup
    notSelected = "1"
    notSelectedBtn = false



    constructor(
        private cardService: CardService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            pic: new FormControl(null),
            text: new FormControl(null, Validators.required),
            type: new FormControl("1"),
            price: new FormControl(null)
        })
    }

    submit() {
        if (this.form.invalid) {
            return
        }

        const card: Card = {
            title: this.form.value.title,
            pic: this.form.value.pic,
            text: this.form.value.text,
            type: this.form.value.type,
            price: this.form.value.price,
            date: new Date()
        }

        this.cardService.create(card).subscribe(() => {
            this.form.reset()
            //TODO не сбрасывать часть формы
            //TODO добавить алерты на ошибку и работу валидаторов
            //TODO заблокировать блядскую кнопку
            //TODO Разобраться с алертами
            //TODO конечные валидаторы?
            //TODO убрать валидаторы полностью ?

            this.form.value.type = "1"
            this.alertService.success("Добавлено")

        })


    }
}
