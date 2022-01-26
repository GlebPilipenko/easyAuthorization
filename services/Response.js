export class Response {
  static send(response, responseStatus, message) {
    return response.status(responseStatus).json({message});
  }
}
