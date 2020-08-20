import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../shared/comment.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment
  @Input() admin: boolean
  @Input() adminAns: boolean
  comAns$: Observable<Comment[]>
  form: FormGroup
  com: Comment [] = []


  response = false

  constructor(private commentService: CommentService) {

  }


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })
    if (this.comment.replies) {
      this.comAns$ = this.commentService.getReplies(this.comment)
      this.comAns$.subscribe(res => {
        res.reverse()
          .forEach(e => {
            this.com.push(e)
          })
      })
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const comment: Comment = {
      name: this.form.value.name,
      text: this.form.value.text,
      date: new Date()
    }

    this.com.unshift(comment)

    this.commentService.createAnswer(comment, this.comment).subscribe(() => {
      this.form.reset()
    })

    this.response = false

  }

  remove(id: string) {
    this.commentService.remove(id).subscribe()
  }
}
