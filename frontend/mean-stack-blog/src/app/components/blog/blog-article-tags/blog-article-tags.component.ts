import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-article-tags',
  templateUrl: './blog-article-tags.component.html',
  styleUrls: ['./blog-article-tags.component.scss']
})
export class BlogArticleTagsComponent implements OnInit {
  tags: any;
  isOnpage: boolean;

  constructor( private router: Router) { }

  @Input('articleTags')
  set articleTags(articleTags: any) {
    this.tags = articleTags || [];
  }

  @Input('onPage')
  set onPage(onPage: any) {
    this.isOnpage = onPage;
  }

  @Output() searchTag = new EventEmitter<any>();

  search(tag: string){
    if(this.isOnpage){
      this.searchTag.emit(tag);
    }else{
      this.router.navigate(['home', tag]);
    }
  }

  ngOnInit() {
  }

}
