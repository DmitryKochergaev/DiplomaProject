import {Component, OnInit} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {User} from 'src/app/shared/interfaces'
import {AuthService} from '../shared/components/services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    form: FormGroup
    submited = false
    message: string


    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['loginAgain']) {
                this.message = 'Войдите в аккаунт'
            } else if (params['authFailed']) {
                this.message = 'Сессия истекла'
            }
        })

        //динамическая форма для карточки
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        })
    }

    submit() {
        if (this.form.invalid) {
            return
        }

        //блокирует вход если пользователь уже в системе
        this.submited = true

        //получаем из формы майл и пароль для user
        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password

        }


        //вход для user и перенос на страницу дашборд
        this.auth.login(user).subscribe(() => {
            this.form.reset()
            this.router.navigate(['/admin', 'dashboard'])
            this.submited = false
        }, () => {
            this.submited = false
        })

    }

}
