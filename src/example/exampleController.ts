import { Body, Controller, Post, Route } from "tsoa";

export interface ThePayload {
  name: string;
}

export interface TheInterface<T> {
  thePayload: T;
}

@Route("example")
export class ExampleController extends Controller {
  @Post()
  public async createUser(
    @Body()
    requestBody: TheInterface<ThePayload>
  ) {
    return requestBody;
  }
}
