import {BrowserModule} from "@angular/platform-browser"
import {NgModule, Provider} from "@angular/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {RouterModule, Routes, PreloadAllModules} from "@angular/router"
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"

import {AppRoutingModule} from "./app-routing.module"
import {AppComponent} from "./app.component"
import {AboutComponent} from "./components/about/about.component"
import {PostcardsComponent} from "./components/postcards/postcards.component"
import {OrderComponent} from "./components/order/order.component"
import {CardComponent} from "./components/card/card.component"
import {ErrorPageComponent} from "./components/error-page/error-page.component"
import {CardPageComponent} from "./components/card-page/card-page.component"
import {SharedModule} from "./shared/shared.module"
import {AuthInterceptor} from "./shared/auth.interceptor"
import {cut} from "./pipes/cut.pipe"
import {NewsPageComponent} from "./components/news-page/news-page.component"
import {NewsComponent} from "./components/news/news.component"
import {NewsSingleComponent} from "./components/news-single-page/news-single.component"
import {registerLocaleData} from "@angular/common"
import ruLocale from "@angular/common/locales/ru";
import {ForumPageComponent} from './components/forum-page/forum-page.component';
import {cutNewsPipe} from "./pipes/cutNews.pipe";
import {ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



registerLocaleData(ruLocale, 'ru')


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

const appRoutes: Routes = [
  {path: "", component: PostcardsComponent},
  {path: "about", component: AboutComponent},
  {path: "card/:id", component: CardPageComponent},
  {path: "news/:id", component: NewsSingleComponent},
  {path: "order", component: OrderComponent},
  {path: "news", component: NewsPageComponent},
  {path: "about", component: AboutComponent},
  {path: "error", component: ErrorPageComponent},
  {path: "forum", component: ForumPageComponent},
  {
    path: "admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: "**", redirectTo: "/error"}

]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PostcardsComponent,
    OrderComponent,
    CardComponent,
    CardPageComponent,
    ErrorPageComponent,
    cut,
    NewsPageComponent,
    NewsComponent,
    NewsSingleComponent,
    ForumPageComponent,
    cutNewsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    }),
    ReactiveFormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
