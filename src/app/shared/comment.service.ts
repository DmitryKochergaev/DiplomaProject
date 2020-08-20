import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Card, Comment, FbCreateResponse} from "./interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})

export class CommentService {
  constructor(private http: HttpClient) {
  }

  create(comment: Comment):Observable<Comment> {
    return this.http.post(`${environment.fbDbUrl}/comments.json`, comment)
      .pipe(map( (response: FbCreateResponse) => {
        return {
          ...comment,
          id: response.name,
          date: new Date()
        }
    }))

  }

  createAnswer(comment: Comment,oldcomment: Comment):Observable<Comment> {
    return this.http.post<Comment>(`${environment.fbDbUrl}/comments/${oldcomment.id}/replies.json`, comment)
      .pipe(map( (response: FbCreateResponse) => {
        return {
          ...comment,
          id: response.name,
          date: new Date()
        }
      }))

  }

  getAll(): Observable<Comment[]> {
    return this.http.get(`${environment.fbDbUrl}/comments.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
        }))
      }))

  }

  getReplies(comment: Comment): Observable<Comment[]> {
    return this.http.get(`${environment.fbDbUrl}/comments/${comment.id}/replies.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
        }))
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/comments/${id}.json`)
  }

  removeReplies(id: string, oldid: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/comments/${oldid}/replies/${id}.json`)
  }

}
