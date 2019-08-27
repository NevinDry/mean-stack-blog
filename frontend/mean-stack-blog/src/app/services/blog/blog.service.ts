import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private config = new Config();

  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get(this.config.getBlogUrl() + 'getAll');
  }

  getHomeArticles(index, searchValue) {
    return this.http.get(this.config.getBlogUrl() + 'getLatest?index=' + index + '&search=' + searchValue);
  }

  getArticleById(id: string) {
    return this.http.get(this.config.getBlogUrl() + 'getOne/' + id);
  }

  deleteArticleById(id: string) {
    return this.http.delete(this.config.getBlogUrl() + 'article/' + id);
  }

  addArticle(article: any) {
    return this.http.post<{}>(`${this.config.getBlogUrl()}` + 'addArticle', article)
      .pipe(
        catchError(error => throwError(error)),
        map((response: any) => {
          console.log(response);
          return response;
        })
      );
  }

  editArticle(article: any, id: any) {
    return this.http.post<{}>(`${this.config.getBlogUrl()}` + 'editArticle/' + id, article)
      .pipe(
        catchError(error => throwError(error)),
        map((response: any) => {
          console.log(response);
          return response;
        })
      );
  }
}
