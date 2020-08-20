import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
    name: "titleCut"
})

export class titleCut implements PipeTransform {
    transform(title: string): string {

        let idx = 0

        for (let c = 0; c < title.length; c++) {
            if (title[c].includes(" ")) {
                idx++
                if (idx == 3) {
                    return title.substr(0, c)
                }
            }
        }
        return title
    }
}
