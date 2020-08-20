import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"
import {Card, FbCreateResponse} from "./interfaces"
import {environment} from "src/environments/environment"
import {map} from "rxjs/operators"



@Injectable({providedIn: "root"})

export class CardService {
    constructor(private http: HttpClient) {
    }


    create(card: Card): Observable<Card> {
        return this.http.post(`${environment.fbDbUrl}/cards.json`, card)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...card,
                    id: response.name,
                    date: new Date()
                }
            }))
    }


    getAll(): Observable<Card[]> {
        return this.http.get(`${environment.fbDbUrl}/cards.json`)
            .pipe(map((response: { [key: string]: any }) => {
                return Object.keys(response).map(key => ({
                    ...response[key],
                    id: key,
                }))
            }))
    }

    // получаем карточку по id и
    getById(id: string): Observable<Card> {
        return this.http.get<Card>(`${environment.fbDbUrl}/cards/${id}.json`)
        //парсим ответ получаем отдельный объект поста
            .pipe(map((card: Card) => {
                return {
                    ...card,
                    id,
                }
            }))
    }


    update(card: Card): Observable<Card> {
        return this.http.patch<Card>(`${environment.fbDbUrl}/cards/${card.id}.json`, card)
    }

    // удаляем карточку
    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/cards/${id}.json`)
    }
}
