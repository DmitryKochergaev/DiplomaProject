import {PipeTransform, Pipe} from "@angular/core"
import {Card} from "src/app/shared/interfaces"

@Pipe({
    name: "cut"
})
export class cut implements PipeTransform {
    transform(cards: Card[], cut = ""): Card[] {
        if (!cut.trim()) {
            return cards
        }

        return cards.filter(card => {
            return card.type == cut.toLocaleLowerCase()
        })
    }
}
