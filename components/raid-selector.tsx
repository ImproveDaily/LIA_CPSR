"use client"

import { RaidType } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const RAID_NAMES = {
  [RaidType.ONYXIA]: "Onyxia's Lair",
  [RaidType.MOLTEN_CORE]: "Molten Core",
  [RaidType.BLACKWING_LAIR]: "Blackwing Lair",
  [RaidType.AHN_QIRAJ]: "Temple of Ahn'Qiraj",
  [RaidType.NAXXRAMAS]: "Naxxramas",
  [RaidType.KARAZHAN]: "Tower of Karazhan",
}

interface RaidSelectorProps {
  value: RaidType
  onValueChange: (value: RaidType) => void
}

export function RaidSelector({ value, onValueChange }: RaidSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecteer een raid" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(RAID_NAMES).map(([type, name]) => (
          <SelectItem key={type} value={type}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 