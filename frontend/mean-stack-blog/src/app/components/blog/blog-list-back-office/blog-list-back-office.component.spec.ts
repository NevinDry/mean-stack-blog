import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListBackofficeComponent } from './blog-list-back-office.component';

describe('BlogListBackofficeComponent', () => {
  let component: BlogListBackofficeComponent;
  let fixture: ComponentFixture<BlogListBackofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogListBackofficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
