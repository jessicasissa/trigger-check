import { computed, Injectable, signal } from '@angular/core';
import { Card, SavedCard } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardStorageService {
  private _savedCards = signal<SavedCard[]>([]);
  readonly savedCards = this._savedCards.asReadonly(); // devolve signal que só permite leitura

  readonly isEmpty = computed(() => this._savedCards().length === 0);
  
  constructor() {
    const stored = localStorage.getItem('trigger-check:cards');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this._savedCards.set(Array.isArray(parsed) ? parsed : []);
      } catch {
        this._savedCards.set([]);
      }
    }
  }
  
  addCard(card: Card, phase: string) {
    const newCard: SavedCard = {
      ...card,
      uid: crypto.randomUUID(),
      phase,
      savedAt: Date.now(),
    };

    this.saveCards([newCard, ...this._savedCards()]);
  }

  removeCard(uid: string) {
    this.saveCards(this._savedCards().filter(item => item.uid !== uid));
  }

  clear() {
    this.saveCards([]);
  }

  private saveCards(cards: SavedCard[]): void {
    localStorage.setItem('trigger-check:cards', JSON.stringify(cards));
    this._savedCards.set(cards);
  }
}
