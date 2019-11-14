import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleTagsComponent } from './blog-article-tags.component';

describe('BlogArticleTagsComponent', () => {
  let component: BlogArticleTagsComponent;
  let fixture: ComponentFixture<BlogArticleTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogArticleTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogArticleTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
