import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogArticleComponent } from './components/blog/blog-article/blog-article.component';
import { AuthComponent } from './components/auth/auth/auth.component';
import { HomeBackOfficeComponent } from './components/backOffice/home-back-office/home-back-office.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AddEditBlogComponent } from './components/blog/add-edit-blog/add-edit-blog.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BlogListComponent },
  { path: 'home/:search', component: BlogListComponent },
  { path: 'blogArticle/:id', component: BlogArticleComponent },
  { path: 'admin', component: AuthComponent },
  {
    path: 'backOffice', component: HomeBackOfficeComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'addEditArticle', component: AddEditBlogComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'addEditArticle/:id', component: AddEditBlogComponent, canActivate: [
      AuthGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
