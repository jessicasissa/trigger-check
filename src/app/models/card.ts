export interface Card {
    id: string,
    name: string,
    image: string,
    oracle_text: string
}

export interface SavedCard extends Card {
    uid: string, // para identificar a linha no front
    phase: string,
    savedAt: number
}
