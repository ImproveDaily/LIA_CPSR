export const RAIDS = [
  "Onyxia's Lair",
  "Molten Core",
  "Blackwing Lair",
  "Temple of Ahn'Qiraj",
  "Naxxramas",
  "Tower of Karazhan"
] as const

export type Raid = typeof RAIDS[number] 