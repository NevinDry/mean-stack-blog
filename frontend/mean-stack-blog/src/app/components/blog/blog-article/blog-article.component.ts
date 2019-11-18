import { Config } from './../../../config/config';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';
import { Article } from 'src/app/models/blog/Article';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';

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
  constructor(private blogService: BlogService, private route: ActivatedRoute, private location: Location,private meta: Meta) { }

  ngOnInit() {



    if (!this.article) {
      this.route.params.subscribe(params => {
        this.blogService.getArticleById(params['id']).pipe(takeUntil(this.unsubscribe))
          .subscribe(
            (response: any) => {
              this.loading = false;
              this.article = response.data;

              //updating meta (ssr on)
              this.meta.updateTag({name: 'author',content: this.article.author});
              this.meta.updateTag({name: 'description',content: this.article.title});
              this.meta.updateTag({name: 'keywords',content: this.article.tags});

              this.meta.updateTag({ property: 'og:url', content: this.config.getClientUrl() + this.location.path() });
              this.meta.updateTag({ property: 'og:type', content: 'article' });
              this.meta.updateTag({ property: 'og:title', content: this.article.title });
              this.meta.updateTag({ property: 'og:description', content: this.article.preview });
              this.meta.updateTag({ property: 'og:image', content: this.config.getPublicImageUrl() + '/blog/' + this.article.imageLink });

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
