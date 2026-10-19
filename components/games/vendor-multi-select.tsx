"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { VitrinThirdPartyVendor } from "@/types/api"

const vendorOptions: {
  value: VitrinThirdPartyVendor
  label: string
}[] = [
  { value: "rubika", label: "روبیکا" },
  { value: "soroush", label: "سروش" },
]

interface VendorMultiSelectProps {
  value: VitrinThirdPartyVendor[]
  onChange: (value: VitrinThirdPartyVendor[]) => void
}

export function VendorMultiSelect({ value, onChange }: VendorMultiSelectProps) {
  function toggleVendor(vendor: VitrinThirdPartyVendor) {
    if (value.includes(vendor)) {
      onChange(value.filter((item) => item !== vendor))
    } else {
      onChange([...value, vendor])
    }
  }

  const selectedLabels = vendorOptions
    .filter((option) => value.includes(option.value))
    .map((option) => option.label)

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={undefined}
            className="w-full justify-between font-normal sm:w-48"
          >
            <span className="truncate">
              {selectedLabels.length
                ? selectedLabels.join("، ")
                : "همه فروشگاه‌ها"}
            </span>
            <ChevronsUpDown className="ms-2 size-4 shrink-0 opacity-50" />
          </Button>
        }
      />

      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="جست‌وجوی فروشگاه..." />
          <CommandList>
            <CommandEmpty>فروشگاهی پیدا نشد.</CommandEmpty>
            <CommandGroup>
              {vendorOptions.map((option) => {
                const selected = value.includes(option.value)

                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => toggleVendor(option.value)}
                  >
                    <Check
                      className={`me-2 size-4 ${
                        selected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
