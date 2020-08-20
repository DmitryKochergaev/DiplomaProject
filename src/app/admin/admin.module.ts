import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {RouterModule} from "@angular/router"
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component"
import {LoginPageComponent} from "./login-page/login-page.component"
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component"
import {CreatePageComponent} from "./create-page/create-page.component"
import {EditPageComponent} from "./edit-page/edit-page.component"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {AuthService} from "./shared/components/services/auth.service"
import {SharedModule} from "../shared/shared.module"
import {AuthGuard} from "./shared/components/services/auth.guard"
import {AlertComponent} from "./shared/components/alert/alert.component"
import {AlertService} from "./shared/components/services/alert.service"
import {CreateNewsPageComponent} from "./create-news-page/create-news-page.component";
import { EditNewsPageComponent } from './edit-news-page/edit-news-page.component'


@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        AlertComponent, CreateNewsPageComponent, EditNewsPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: "", component: AdminLayoutComponent, children: [
                    {path: "", redirectTo: "/admin/login", pathMatch: "full"},
                    {path: "login", component: LoginPageComponent},
                    {path: "dashboard", component: DashboardPageComponent, canActivate: [AuthGuard]},
                    {path: "createCards", component: CreatePageComponent, canActivate: [AuthGuard]},
                    {path: "createNews", component: CreateNewsPageComponent, canActivate: [AuthGuard]},
                    {path: "card/:id/edit", component: EditPageComponent, canActivate: [AuthGuard]},
                    {path: "news/:id/edit", component: EditNewsPageComponent, canActivate: [AuthGuard]}
                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [AuthGuard, AlertService]
})
export class AdminModule {

}
