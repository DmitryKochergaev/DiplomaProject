import {PipeTransform, Pipe} from "@angular/core"
import {Card} from "src/app/shared/interfaces"


@Pipe({
    name: "searchCards"
})

export class searchCards implements PipeTransform {
    transform(cards: Card[], search = ""): Card[] {
        if (!search.trim()) {
            return cards
        }

        return cards.filter(card => {
            return card.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })
    }
}
