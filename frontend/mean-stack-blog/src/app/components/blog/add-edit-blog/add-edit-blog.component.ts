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
  fileError = null;
  fileContentError = null;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private blogService: BlogService, private authService: AuthService, private uploadService: UploadService) { }

  @ViewChild("inputImage", { static: false }) inputImage;
  @ViewChild("inputContentImage", { static: false }) inputContentImage;

  ngOnInit() {

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      preview: ['', Validators.required],
      content: ['', Validators.required],
      time: ['', []],
      image: [null, []],
      tags: ['', []],
      imageLink: ['', Validators.required],
      imagesContent: [[], []]
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
              this.articleForm.patchValue({ tags: this.articleToEdit.tags });
              this.articleForm.patchValue({ imageLink: this.articleToEdit.imageLink });
              this.articleForm.patchValue({ imagesContent: this.articleToEdit.imagesContent || [] });
            },
            err => {
              this.error = err.error.message;
              this.loading = false;
            }
          );
      }
    });
  }

  fileChangeEvent(isContentImage: boolean) {
    this.fileContentError = null;
    let image: File;
    const fi = isContentImage ? this.inputContentImage.nativeElement : this.inputImage.nativeElement;
    if (fi.files && fi.files[0]) {
      image = fi.files[0];
    }

    if (image.size > 2000000) {
      isContentImage ? this.fileContentError = "File is too large" : this.fileError = "File is too large";
      
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    const folder = isContentImage ? 'blogArticleContent' : 'blog';

    this.uploadService.uploadImage(formData, folder).subscribe(
      response => {
        if (isContentImage) {
          const imagesContent = this.articleForm.value['imagesContent'] || [];
          imagesContent.push({ imageLink: response.data });
          this.articleForm.patchValue({
            imagesContent: imagesContent
          });
        } else {
          this.articleForm.patchValue({
            imageLink: response.data
          });
        }
      },
      error => {
        this.loading = false;
        if (isContentImage) {
          this.fileContentError = error.error.message;
        } else {
          this.fileError = error.error.message;

        }
      });
  }

  removeContentImage(imageLink) {
    let imagesContent = this.articleForm.value['imagesContent'];
    imagesContent.splice(imagesContent.findIndex(x => x.imageLink === imageLink), 1);
    this.articleForm.patchValue({
      imagesContent: imagesContent
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
            this.router.navigate(['/backOffice']);
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
            this.router.navigate(['/backOffice']);
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
      tags: this.articleForm.value.tags,
      readingTime: this.articleForm.value.time,
      imageLink: this.articleForm.value.imageLink
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
