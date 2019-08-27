import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent implements OnInit {

  private comments;
  showCommentForm = false;
  commentForm: FormGroup;
  submitted: boolean = false;
  sendError = null;
  loading: boolean;
  id: any;
  constructor(private blogService:BlogService, private formBuilder: FormBuilder) { }

  @Input('articleComments')
  set articleComments(articleComments: any) {
    this.comments = articleComments;
  }

  @Input('articleId')
  set articleId(articleId: any) {
    this.id = articleId;
  }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      author: [''],
      comment: ['', Validators.required],
    });
  }

  onSubmitCommentForm() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    this.sendError = null;
    this.loading = true;


    this.blogService.addComment(this.commentForm.value, this.id).subscribe(
      response => {
        this.loading = false;
        this.comments.unshift(response.data);
        this.showCommentForm = false;
      },
      error => {
        this.loading = false;
        this.sendError = error.error.message;
      }
    );


  }

}
