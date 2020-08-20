import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router'
import {CardService} from 'src/app/shared/card.service'
import {Observable} from 'rxjs'
import {Card} from 'src/app/shared/interfaces'
import {switchMap} from 'rxjs/operators'

@Component({
    selector: 'app-card-page',
    templateUrl: './card-page.component.html',
    styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {
    card$: Observable<Card>

    //TODO кнопка и цена

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.card$ = this.route.params.pipe(
            switchMap((params: Params) => {
                return this.cardService.getById(params.id)
            })
        )
    }

    back() {
        this.router.navigate([''])
    }
}
