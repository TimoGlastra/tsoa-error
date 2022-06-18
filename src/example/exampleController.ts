import { Body, Controller, Post, Route } from "tsoa";
import { Agent } from "@aries-framework/core";
import { IndyCredentialFormat } from "@aries-framework/core/build/modules/credentials/formats/indy/IndyCredentialFormat";
import { CredentialFormatPayload } from "@aries-framework/core/build/modules/credentials/formats";
import { V1CredentialService } from "@aries-framework/core/build/modules/credentials/protocol/v1/V1CredentialService";
import { V2CredentialService } from "@aries-framework/core/build/modules/credentials/protocol/v2/V2CredentialService";

type CredentialFormats = [IndyCredentialFormat];
type CredentialServices = [V1CredentialService, V2CredentialService];

interface OfferCredentialRequest {
  connectionId: string;
  credentialFormats: CredentialFormatPayload<CredentialFormats, "createOffer">;
  protocolVersion: CredentialServices[number]["version"];
}

@Route("example")
export class ExampleController extends Controller {
  private agent!: Agent;

  @Post()
  public async method(
    @Body()
    body: OfferCredentialRequest
  ) {
    await this.agent.credentials.offerCredential(body);
  }
}
