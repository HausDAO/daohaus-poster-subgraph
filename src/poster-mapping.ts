import { NewPost } from "../generated/Poster/Poster";
// import { Post } from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";
import { parser } from "./util/parser";
import { constants } from "./util/constants";
import { validator } from "./util/validator";

// event NewPost(address indexed user, string content, string indexed tag);
export function handleNewPost(event: NewPost): void {
  let result = parser.getResultFromJson(event.params.content);
  if (result.error != "none") {
    return;
  }
  let object = result.object;

  let moloch = parser.getStringFromJson(object, "molochAddress");
  if (moloch.error != "none") {
    log.error('Post with content ID {} errored on "type" parameter', [
      event.transaction.hash.toHexString(),
    ]);
    return;
  }
  let molochAddress = moloch.data;

  if (event.params.tag.toHexString() == constants.DAOHAUS_DOCUMENT_MINION) {
    if (!validator.isMolochMinion(molochAddress, event.transaction.from)) {
      return;
    }

    log.info("valid content daohaus.document.minion: {}", [
      event.params.content,
    ]);

    parser.createBasicContent(object, molochAddress, event, true);
  }

  if (event.params.tag.toHexString() == constants.DAOHAUS_DOCUMENT_MEMBER) {
    if (!validator.isMolochMember(molochAddress, event.transaction.from)) {
      return;
    }

    log.info("valid content daohaus.document.member: {}", [
      event.params.content,
    ]);

    parser.createBasicContent(object, molochAddress, event, false);
  }
}
