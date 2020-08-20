import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Card, FbCreateResponse, News} from "./interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})


export class NewsService {
  constructor(private http: HttpClient) {
  }

  create(news: News): Observable<News> {
    return this.http.post(`${environment.fbDbUrl}/news.json`, news)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...news,
          id: response.name,
          date: new Date()
        }
      }))

  }

  getAll(): Observable<News[]> {
    return this.http.get(`${environment.fbDbUrl}/news.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
        }))
      }))
  }

  getById(id: string): Observable<News> {
    return this.http.get<News>(`${environment.fbDbUrl}/news/${id}.json`)
      //парсим ответ получаем отдельный объект поста
      .pipe(map((news: News) => {
        return {
          ...news,
          id,
        }
      }))
  }

  update(news: News): Observable<News> {
    return this.http.patch<News>(`${environment.fbDbUrl}/news/${news.id}.json`, news)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/news/${id}.json`)
  }

}


