import { Config } from './../../../config/config';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';
import { Article } from 'src/app/models/blog/Article';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

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
  config = new Config();

  @Input('articleFromPreview')
  set articleFromPreview(value: Article) {
    this.article = value;
  }
  constructor(private blogService: BlogService, private route: ActivatedRoute, private meta: Meta) { }

  ngOnInit() {



    if (!this.article) {
      this.route.params.subscribe(params => {
        this.blogService.getArticleById(params['id']).pipe(takeUntil(this.unsubscribe))
          .subscribe(
            (response: any) => {
              this.loading = false;
              this.article = response.data;
              console.log(this.article);
              console.log(response);

              // this.meta.updateTag({name: 'author',content: this.article.author});
              // this.meta.updateTag({name: 'description',content: this.article.title});
              // this.meta.updateTag({ property: 'og:type', content: 'website' });
              // this.meta.updateTag({ property: 'og:title', content: this.article.title });
              // this.meta.updateTag({ property: 'og:description', content: this.article.preview });
              // this.meta.updateTag({ property: 'og:url', content: "http://abc[dot]com" });
              this.meta.updateTag({name: 'author',content: 'website'});
              this.meta.updateTag({name: 'description',content: 'website'});
              this.meta.updateTag({ property: 'og:type', content: 'website' });
              this.meta.updateTag({ property: 'og:title', content: 'website' });
              this.meta.updateTag({ property: 'og:description', content: 'website' });
              this.meta.updateTag({ property: 'og:url', content: "http://abc[dot]com" });
              if(this.article.comments){
                this.article.comments.sort(function(a,b){return new Date(b.date).getTime() - new Date(a.date).getTime()});
              }
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
