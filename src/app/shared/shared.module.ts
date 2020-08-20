import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {searchCards} from "../pipes/search.pipe";
import {titleCut} from "../pipes/title.pipe"
import {CommentComponent} from "../components/comment/comment.component";
import {ComponentsAnsComponent} from "../components/components-ans/components-ans.component";
import {CommonModule, registerLocaleData} from "@angular/common"
import ruLocale from "@angular/common/locales/ru";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


registerLocaleData(ruLocale, 'ru')


@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot(), CommonModule, ReactiveFormsModule],
  declarations: [searchCards, titleCut, CommentComponent, ComponentsAnsComponent],
  exports: [HttpClientModule, QuillModule, searchCards, titleCut, CommentComponent, ComponentsAnsComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {
}
