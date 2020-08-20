import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../shared/comment.service";

@Component({
  selector: 'app-components-ans',
  templateUrl: './components-ans.component.html',
  styleUrls: ['./components-ans.component.css']
})
export class ComponentsAnsComponent implements OnInit {

  @Input() comment: Comment
  @Input() oldcomment: Comment
  @Input() admin: boolean

  //TODO убрать ответ для каждого либо сортировка по дате ?
  //TODO убрал ответ для каждого не возрощать ? либо разобраться с сортировкой
  //TODO для кого ответ куда поместить и оставить ли
  response = false;

  form: FormGroup


  constructor(private commentService: CommentService) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })
  }

  submit() {

    if (this.form.invalid) {

      return
    }

    const comment: Comment = {
      name: this.form.value.name,
      date: new Date(),
      text: this.form.value.text

    }


    this.commentService.createAnswer(comment, this.oldcomment).subscribe(() => {
      this.form.reset()
    })

    this.response = false

  }

  remove(id: string, oldid: string) {
    this.commentService.removeReplies(id,oldid).subscribe();
  }
}
