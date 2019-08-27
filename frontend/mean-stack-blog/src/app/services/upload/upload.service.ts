import { Injectable } from '@angular/core';
import { Config } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private config = new Config();

  constructor(private http: HttpClient) { }

  uploadImage(file: any, type: string) {
    return this.http.post<{}>(`${this.config.getUploadUrl()}` + 'uploadImage/' + type, file)
      .pipe(
        catchError(error => throwError(error)),
        map((response: any) => {
          return response;
        })
      );
  }

}