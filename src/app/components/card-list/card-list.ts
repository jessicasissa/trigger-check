import { Component, inject, OnInit, signal } from '@angular/core';
import { MtgService } from '../../services/mtg';
import { Card } from '../../models/card';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-list',
  imports: [FormsModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  private mtgService = inject(MtgService);
  error = signal('');
  isLoading = signal(false);
  selectedCard = signal<Card|null> (null);
  searchTerm = '';
  subscription: Subscription | null = null;

  onSearchTermChange(term: string) {
    let query = term.trim().toLowerCase();

    if (query.length === 0) {
      return;
    }
    
    this.isLoading.set(true);
    this.subscription?.unsubscribe();
    
    this.subscription = this.mtgService.searchCardByName(query).subscribe({
      next: (dados) => {
        this.selectedCard.set(dados);
      }, 
      error: (erro) => {
        this.selectedCard.set(null);
        this.isLoading.set(false);
        console.error('Erro ao buscar carta: ', erro);
        this.error.set(erro.message);
      },
      complete: () => {
        this.isLoading.set(false);
        this.error.set('');
      }
    });

  }
}
