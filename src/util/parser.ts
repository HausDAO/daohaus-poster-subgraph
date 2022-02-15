import {
  Bytes,
  log,
  JSONValue,
  JSONValueKind,
  TypedMap,
  json,
  ByteArray,
} from "@graphprotocol/graph-ts";
import { NewPost } from "../../generated/Poster/Poster";
import { Content } from "../../generated/schema";

class JsonStringResult {
  data: string;
  error: string;
}
class JsonResult {
  object: TypedMap<string, JSONValue>;
  error: string;
}

export namespace parser {
  export function getResultFromJson(content: string): JsonResult {
    let result: JsonResult;
    result.error = "none";
    let jsonResult = json.try_fromBytes(ByteArray.fromUTF8(content) as Bytes);
    if (jsonResult.isError) {
      result.error = "Failed to parse JSON";
      return result;
    }
    result.object = jsonResult.value.toObject();
    return result;
  }

  export function getStringFromJson(
    object: TypedMap<string, JSONValue>,
    key: string
  ): JsonStringResult {
    let result: JsonStringResult;
    result.error = "none";
    let value = object.get(key);

    if (!value || value.kind != JSONValueKind.STRING) {
      result.error = "Missing valid Poster field: " + key;
      return result;
    }
    result.data = value.toString();
    return result;
  }

  export function createBasicContent(
    object: TypedMap<string, JSONValue>,
    molochAddress: string,
    event: NewPost
  ): Content {
    // todo: separate the paring form the entity creation
    let entityId = molochAddress
      .concat("-content-")
      .concat(event.block.timestamp.toString());
    let entity = new Content(entityId);

    // let content = parser.getStringFromJson(object, "content");
    // if (content.error != "none") {
    //   log.error('Post with content ID {} errored on "type" parameter', [
    //     event.transaction.hash.toHexString(),
    //   ]);
    //   return entity;
    // }

    let contentType = parser.getStringFromJson(object, "contentType");
    if (contentType.error != "none") {
      log.error('Post with content ID {} errored on "type" parameter', [
        event.transaction.hash.toHexString(),
      ]);
      return entity;
    }

    let location = parser.getStringFromJson(object, "location");
    if (location.error != "none") {
      log.error('Post with content ID {} errored on "type" parameter', [
        event.transaction.hash.toHexString(),
      ]);
      return entity;
    }

    entity.createdAt = event.block.timestamp.toString();
    entity.transactionHash = event.transaction.hash;
    entity.molochAddress = molochAddress;
    entity.memberAddress = event.transaction.from;
    // entity.content = content.data;
    entity.contentType = contentType.data;
    entity.location = location.data;
    entity.rawData = event.params.content;

    entity.save();

    return entity;
  }
}
