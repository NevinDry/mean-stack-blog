import { takeUntil } from 'rxjs/operators';
import { BlogService } from './../../../services/blog/blog.service';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-blog-list-back-office',
  templateUrl: './blog-list-back-office.component.html',
  styleUrls: ['./blog-list-back-office.component.scss']
})
export class BlogListBackofficeComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  modalRef: BsModalRef;
  articles: any[] = [];
  deleteId: string;
  loading: boolean;
  error: boolean;

  constructor(private blogService: BlogService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loading = true;
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

  openModal(template: TemplateRef<any>, id) {
    this.deleteId = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  accept() {
    this.loading = true;
    this.blogService.deleteArticleById(this.deleteId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.modalRef.hide();

          var index = this.articles.findIndex(x => x._id === this.deleteId);
          if (index > -1) {
            this.articles.splice(index, 1);
          }
          this.deleteId = null;
        },
        err => {
          this.error = err.error.message;;
          this.loading = false;
          this.modalRef.hide();
        }
      );
  }

  reject(): void {
    this.deleteId = null;
    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
