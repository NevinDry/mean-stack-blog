import { BlogService } from './../../../services/blog/blog.service';
import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Config } from '../../../config/config';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  articles: any[] = [];
  loading: boolean;
  fetchingOlder: boolean;
  error: boolean;
  pageIndex = 0;
  searchValue = "";
  config = new Config();

  constructor(private blogService: BlogService, @Inject(DOCUMENT) private document) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {

    const scrollPercent = ((window.scrollY + window.innerHeight) * 100) / document.body.offsetHeight;

    if (!this.fetchingOlder && scrollPercent > 90) {
      this.fetchingOlder = true;
      this.getArticles();
    }
  }

  ngOnInit() {
    this.loading = true;
    this.getArticles();
  }

  getArticles() {
    this.blogService.getHomeArticles(this.pageIndex, this.searchValue)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.data && response.data.length) {
            this.articles = this.articles.concat(response.data);
            this.pageIndex += 3;
            this.fetchingOlder = false;
          }
        },
        err => {
          this.error = true;
          this.loading = false;
          this.fetchingOlder = false;
        }
      );
  }

  searchArticles(searchValue) {
    searchValue ? this.searchValue = searchValue : this.searchValue = "";
    this.pageIndex = 0;
    this.articles = [];
    this.getArticles();
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
