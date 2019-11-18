import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blog-article-tags',
  templateUrl: './blog-article-tags.component.html',
  styleUrls: ['./blog-article-tags.component.scss']
})
export class BlogArticleTagsComponent implements OnInit {
  tags: any;

  constructor() { }

  @Input('articleTags')
  set articleTags(articleTags: any) {
    this.tags = articleTags || [];
  }

  @Output() searchTag = new EventEmitter<any>();

  search(tag: string){
    this.searchTag.emit(tag);
  }

  ngOnInit() {
  }

}
