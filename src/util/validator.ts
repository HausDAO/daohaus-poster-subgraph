import { Address, log } from "@graphprotocol/graph-ts";
import { Minion } from "../../generated/Poster/Minion";
import { Moloch } from "../../generated/Poster/Moloch";
import { constants } from "./constants";

export namespace validator {
  export function isMolochMinion(
    molochAddress: string,
    senderAddress: Address
  ): boolean {
    // let address = changetype<Address>(minionAddress);
    // let contract = SafeMinion.bind(address);
    let minionContract = Minion.bind(senderAddress);

    let result = minionContract.try_moloch();
    if (result.reverted) {
      log.info("^^^^^ minion call failed; {}", [senderAddress.toHexString()]);
      return false;
    }

    return result.value.toHexString() === molochAddress;
  }

  export function isMolochMember(
    molochAddress: string,
    senderAddress: Address
  ): boolean {
    let address = changetype<Address>(molochAddress);
    let molochContract = Moloch.bind(address);

    let result = molochContract.try_members(senderAddress);
    if (result.reverted) {
      log.info("^^^^^ member call failed; {}", [senderAddress.toHexString()]);
      return false;
    }

    return result.value.value1 > constants.BIGINT_ZERO;
  }
}
