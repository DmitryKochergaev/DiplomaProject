import {Injectable} from "@angular/core"

@Injectable({providedIn: "root"})
export class SharedService {
     searchS = ""

    searchChange(s: string) {
        this.searchS = s
    }
}
