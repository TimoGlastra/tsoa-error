import { Body, Controller, Post, Route } from "tsoa";

export interface Format {
  key: string;
  value: unknown;
}

export interface ExampleFormat extends Format {
  key: "example";
  value: {
    theValue: string;
  };
}

interface CreateUserRequest {
  formats: FormatPayload<[ExampleFormat]>;
}

/**
 * Get the payload from a list of Format interfaces
 *
 * @example
 * ```
 *
 * type CreateOfferFormat = FormatPayload<[ExampleFormat]>
 *
 * // equal to
 * type CreateOfferFormat = {
 *  example: {
 *   theValue: string;
 *  }
 * }
 * ```
 */
export declare type FormatPayload<Fs extends Format[]> = {
  [Format in Fs[number] as Format["key"]]?: Format["value"];
};

@Route("example")
export class ExampleController extends Controller {
  @Post()
  public async createUser(
    @Body()
    requestBody: CreateUserRequest
  ) {
    console.log(requestBody);

    return 10;
  }
}
