import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogArticleComponent } from './components/blog/blog-article/blog-article.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'blogArticle/:id', component: BlogArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
