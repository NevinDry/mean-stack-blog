import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

export class Config {

  private blogUrl = BACKEND_URL + '/api/blog/';
  private publicImageUrl = BACKEND_URL + '/media/uploads';
  private userUrl = BACKEND_URL + '/api/user/';
  private uploadUrl = BACKEND_URL + '/api/upload/';

  public getBlogUrl(){
    return this.blogUrl;
  }

  public getPublicImageUrl() {
    return this.publicImageUrl;
  }

  public getUserUrl() {
    return this.userUrl;
  }

  public getUploadUrl() {
    return this.uploadUrl;
  }
}
