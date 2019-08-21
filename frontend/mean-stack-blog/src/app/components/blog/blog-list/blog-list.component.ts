import { BlogService } from './../../../services/blog/blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  constructor(private blogService:BlogService) { }

  ngOnInit() {
    this.blogService.getAllArticles()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
