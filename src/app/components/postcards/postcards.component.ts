import {Component, OnInit} from "@angular/core"
import {Route} from "@angular/compiler/src/core"
import {CardService} from "src/app/shared/card.service"
import {Card} from "src/app/shared/interfaces"
import {Observable} from "rxjs"
import {SharedService} from "../../shared/shared.service"

//TODO btn group toggle active in a page
//TODO empty page

@Component({
    selector: "app-postcards",
    templateUrl: "./postcards.component.html",
    styleUrls: ["./postcards.component.css"]
})
export class PostcardsComponent implements OnInit {
    searchStr = ""
    cutStr = "cybeniri"

    constructor(private cardService: CardService, private search: SharedService) {
    }

    cards$: Observable<Card[]>

    ngOnInit() {
        this.cards$ = this.cardService.getAll()
    }


    btnToggle(cut: string) {
        this.cutStr = cut
    }
}

