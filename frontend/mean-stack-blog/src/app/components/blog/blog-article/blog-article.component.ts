import { Config } from './../../../config/config';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';
import { Article } from 'src/app/models/blog/Article';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss'],
  providers: [DatePipe]
})
export class BlogArticleComponent implements OnInit, OnDestroy {
  article: Article;
  private unsubscribe: Subject<void> = new Subject();
  loading: boolean;
  error: boolean;
  private config = new Config();


  @Input('articleFromPreview')
  set articleFromPreview(value: Article) {
    this.article = value;
  }
  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {

    if (!this.article) {
      this.route.params.subscribe(params => {
        this.blogService.getArticleById(params['id']).pipe(takeUntil(this.unsubscribe))
          .subscribe(
            (response: any) => {
              this.loading = false;
              this.article = response.data;
            },
            err => {
              this.error = true;
              this.loading = false;
            }
          );
      });
    }

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
