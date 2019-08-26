import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

export class Config {

  private blogUrl = BACKEND_URL + '/api/blog/';
  private publicImageUrl = BACKEND_URL + '/media/uploads';

  public getBlogUrl(){
    return this.blogUrl;
  }

  public getPublicImageUrl() {
    return this.publicImageUrl;
  }
}
