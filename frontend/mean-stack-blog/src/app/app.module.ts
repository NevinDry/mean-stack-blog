import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BlogArticleComponent } from './components/blog/blog-article/blog-article.component';

import { MarkdownModule } from 'ngx-markdown';
import { AuthComponent } from './components/auth/auth/auth.component';
import { HomeBackOfficeComponent } from './components/backOffice/home-back-office/home-back-office.component';
import { AuthIntercepter } from './services/auth/auth-intercepter';
import { BlogListBackofficeComponent } from './components/blog/blog-list-back-office/blog-list-back-office.component';
import { AddEditBlogComponent } from './components/blog/add-edit-blog/add-edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    LoadingComponent,
    BlogArticleComponent,
    AuthComponent,
    HomeBackOfficeComponent,
    BlogListBackofficeComponent,
    AddEditBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
