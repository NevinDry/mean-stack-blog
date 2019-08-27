import { Config } from './../../../config/config';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/models/blog/Article';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog/blog.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.scss']
})
export class AddEditBlogComponent implements OnInit, OnDestroy {

  articleForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  sendSuccess: boolean = false;
  sendError = null;
  preview: Article;
  isEdit: boolean = false;
  config = new Config();
  articleToEdit: any = null;
  error: boolean;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private blogService: BlogService, private authService: AuthService, private uploadService: UploadService) { }

  @ViewChild("inputImage", {static: false}) inputImage;

  ngOnInit() {

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      preview: ['', Validators.required],
      content: ['', Validators.required],
      time: ['', []],
      image: [null, []],
      imageLink: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.blogService.getArticleById(params['id']).pipe(takeUntil(this.unsubscribe))
          .subscribe(
            (response: any) => {
              this.loading = false;
              this.articleToEdit = response.data;

              this.articleForm.patchValue({ title: this.articleToEdit.title });
              this.articleForm.patchValue({ preview: this.articleToEdit.preview });
              this.articleForm.patchValue({ content: this.articleToEdit.content });
              this.articleForm.patchValue({ time: this.articleToEdit.readingTime });
              this.articleForm.patchValue({ imageLink: this.articleToEdit.imageLink });
            },
            err => {
              this.error = err.error.message;
              this.loading = false;
            }
          );
      }
    });
  }

  fileChangeEvent() {
    let image: File;
    const fi = this.inputImage.nativeElement;
    if (fi.files && fi.files[0]) {
      image = fi.files[0];
    }

    const formData = new FormData();
    formData.append('file', image);

    this.uploadService.uploadImage(formData, 'blog').subscribe(
      response => {
        this.articleForm.patchValue({
          imageLink: response.data
        });
      },
      error => {
        this.loading = false;
        this.sendError = error.error.message;
      });
  }

  onSubmitArticleForm() {
    this.submitted = true;
    if (this.articleForm.invalid) {
      return;
    }
    this.sendSuccess = false;
    this.sendError = null;
    this.loading = true;

    if (this.isEdit) {
      this.blogService.editArticle(this.articleForm.value, this.articleToEdit._id).subscribe(
        response => {
          this.loading = false;
          this.sendSuccess = true;
          setTimeout(() => {
            this.sendSuccess = false;
            this.preview = null;
            this.router.navigate(['/blogArticle', response.data]);
          }, 1000);
        },
        error => {
          this.loading = false;
          this.preview = null;
          this.sendError = error.error.message;
        }
      );
    } else {
      this.blogService.addArticle(this.articleForm.value).subscribe(
        response => {
          this.loading = false;
          this.sendSuccess = true;
          setTimeout(() => {
            this.sendSuccess = false;
            this.preview = null;
            this.router.navigate(['/blogArticle', response.data]);
          }, 1000);
        },
        error => {
          this.loading = false;
          this.preview = null;
          this.sendError = error.error.message;
        }
      );
    }


  }

  onPreview() {
    // sets the preview object binded to blog-article component
    this.preview = {
      title: this.articleForm.value.title,
      author: this.authService.user.name,
      preview: this.articleForm.value.preview,
      content: this.articleForm.value.content,
      date: new Date(),
      readingTime: this.articleForm.value.time,
      imageLink: this.articleForm.value.imageLink
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
