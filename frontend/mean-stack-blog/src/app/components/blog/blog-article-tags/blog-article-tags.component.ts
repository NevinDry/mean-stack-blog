import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-article-tags',
  templateUrl: './blog-article-tags.component.html',
  styleUrls: ['./blog-article-tags.component.scss']
})
export class BlogArticleTagsComponent implements OnInit {
  tags: any;
  id: any;

  constructor() { }

  @Input('articleTags')
  set articleTags(articleTags: any) {
    this.tags = articleTags || [];
  }

  @Input('articleId')
  set articleId(articleId: any) {
    this.id = articleId;
  }

  ngOnInit() {
  }

}
