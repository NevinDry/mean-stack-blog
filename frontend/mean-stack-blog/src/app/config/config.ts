import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;
const CLIENT_URL = environment.clientUrl;

export class Config {

  private blogUrl = BACKEND_URL + '/api/blog/';
  private publicImageUrl = BACKEND_URL + '/media/uploads';
  private userUrl = BACKEND_URL + '/api/user/';
  private uploadUrl = BACKEND_URL + '/api/upload/';

  
  public getClientUrl(){
    return CLIENT_URL;
  }

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
