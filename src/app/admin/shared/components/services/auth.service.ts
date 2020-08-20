import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, FbAuthResponse } from 'src/app/shared/interfaces';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService {

    public error$: Subject<string> = new Subject<string>()


    constructor(private http: HttpClient) {
    }

    //гетер для токена и проверка времени его жизни
    get token(): string {
        const expDate = new Date(localStorage.getItem('fb-token-exp'))
        if (new Date() > expDate) {
            this.logout()
            return null
        }
        return localStorage.getItem('fb-token')
    }

    //вход в систему по apiKey и сетим токен
    login(user: User): Observable<any> {
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            )
    }

    //убиваем время жизни токена => логаут
    logout() {
        this.setToken(null)
    }

    //проверям залогинился ли пользователь
    isAuthenticated(): boolean {
        return (!!this.token)
    }

    //парсим ответ с сервера и выводим его в шаблон 
    private handleError(error: HttpErrorResponse) {
        const { message } = error.error.error

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email')
                break
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль')
                break
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого email нет')
                break
        }

        return throwError(error)
    }

    //утсанавливаем время жизни для токена
    private setToken(response: FbAuthResponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('fb-token', response.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
    }
}