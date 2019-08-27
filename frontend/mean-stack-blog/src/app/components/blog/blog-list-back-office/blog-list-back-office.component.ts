import { takeUntil } from 'rxjs/operators';
import { BlogService } from './../../../services/blog/blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog-list-back-office',
  templateUrl: './blog-list-back-office.component.html',
  styleUrls: ['./blog-list-back-office.component.scss']
})
export class BlogListBackofficeComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  articles: any[] = [];
  loading: boolean;
  error: boolean;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getAllArticles()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.data && response.data.length) {
            this.articles = response.data;
          }
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }

  deleteArticle(id) {
    // this.confirmService.confirm({
    //   message: "T'es sur tu veux delete gros?",
    //   header: 'Suppression',
    //   icon: 'pi pi-info-circle',
    //   acceptLabel: 'Oui',
    //   rejectLabel: 'Non lol',
    //   accept: () => {
    //     this.blogService.deleteArticleById(id)
    //       .pipe(takeUntil(this.unsubscribe))
    //       .subscribe(
    //         (response: any) => {
    //           this.loading = false;
    //           var index = this.articles.findIndex(x => x._id === id);
    //           if (index > -1) {
    //             this.articles.splice(index, 1);
    //           }
    //         },
    //         err => {
    //           this.error = err.error.message;;
    //           this.loading = false;
    //         }
    //       );
    //   },
    //   reject: () => {
    //     console.log("rejected");
    //   }
    // });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
