import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

export class Config {

  private blogUrl = BACKEND_URL + '/api/blog/';

  public getBlogUrl(){
    return this.blogUrl;
  }
}
