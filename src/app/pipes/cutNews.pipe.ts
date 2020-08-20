import {PipeTransform, Pipe} from "@angular/core"

@Pipe({
  name: "cutNewsPipe"
})

export class cutNewsPipe implements PipeTransform {
  transform(title: string): string {

    let idx = 0

    for (let c = 0; c < title.length; c++) {
      if (title[c].includes(" ")) {
        idx++
        if (idx == 6) {
          return title.substr(0, c)
        }
      }
    }
    return title
  }
}
