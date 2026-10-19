import { validVendors } from "@/constants/vendors"
import { VitrinThirdPartyVendor } from "@/types/api"

export function isValidVitrinThirdPartyVendor(
  vendor: string
): vendor is VitrinThirdPartyVendor {
  return validVendors.some((v) => v === vendor)
}

export function parseVendors(values: string[]): VitrinThirdPartyVendor[] {
  return values.filter((value) => isValidVitrinThirdPartyVendor(value))
}
