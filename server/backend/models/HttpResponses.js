module.exports.HttpSuccess = class HttpResponse{
    constructor(success, status, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.status = status;
  }
}

module.exports.HttpError = class HttpError{
    constructor(message, error, status) {
    this.success = false;
    this.message = message;
    this.status = status;
    this.error = error;
  }
}