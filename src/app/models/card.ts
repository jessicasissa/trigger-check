export interface Card {
    id: string,
    name: string,
    image: string,
    oracle_text: string
}

export interface SavedCard extends Card {
    phase: string,
    savedAt: number
}

export const PHASES = [
    'Upkeep',
    'Draw',
    'Main 1',
    'Combat',
    'Main 2',
    'End Step'
] as const;
