import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Comment} from "../../shared/interfaces";
import {CommentService} from "../../shared/comment.service";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";


//TODO append comments
//TODO back colors if none comments
//TODO btn validators
//TODO answer make smaller main alike
//TODO ng if loading doesnot work
@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {

  form: FormGroup
  comments$: Observable<Comment[]>
  clickedTextArea = false;

  com: Comment[] = []


  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.com.length = 0
    this.comments$ = this.commentService.getAll()

    this.comments$
      .subscribe(res => {
        res.reverse()
          .forEach(e => {
            this.com.push(e)
          })
      })


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
      text: this.form.value.text,
      date: new Date()
    }

    this.com.unshift(comment)
    this.commentService.create(comment).subscribe(() => {
      this.form.reset()
      this.clickedTextArea = false
    })

  }
}
