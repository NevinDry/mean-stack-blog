import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../config/config';

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
}
