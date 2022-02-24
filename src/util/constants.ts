import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export namespace constants {
  export let BIGINT_ZERO = BigInt.fromI32(0);
  export let BIGINT_ONE = BigInt.fromI32(1);
  export let BIGDECIMAL_ZERO = new BigDecimal(constants.BIGINT_ZERO);
  export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
  export const BYTES32_ZERO =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  export const MANIFESTO_TAG_STRING =
    "0x833dec0c25dba9b0ecd9d231e8eb0f6e53c57df07b181c478bc55f88db8548d1";
  // daohaus.document.minion
  export const DAOHAUS_DOCUMENT_MINION =
    "b8914483df978adf1e0c56d779b486d84b246bf191ee217e7e04585aa202b9cb";
  // daohaus.document.member
  export const DAOHAUS_DOCUMENT_MEMBER =
    "fb49a9ea2a00dc3bbd1a1564686946d45e9cb59dbfa6424024b100a00982041e";
}
