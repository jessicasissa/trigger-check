import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MtgService } from '../../services/mtg';
import { Card } from '../../models/card';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-card-list',
  imports: [JsonPipe],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList implements OnInit {
  private mtgService = inject(MtgService);
  private destroyRef = inject(DestroyRef);
  error = signal('');
  isLoading = signal(false);
  selectedCard = signal<Card|null> (null);

  ngOnInit() {
    this.isLoading.set(true);
    let card = this.mtgService.getRandomCard().subscribe({
      next: (dados) => {
        this.selectedCard.set(dados);
      },
      error: (erro) => {
        console.error('Erro ao acessar a API: ', erro);
        this.error.set('Algo deu errado ao buscar uma carta. Tente novamente em alguns segundos!');
      },
      complete: () => {
        // console.log('Carta encontrada com sucesso!');
        this.isLoading.set(false);
        this.error.set('');
      }
    });

    this.destroyRef.onDestroy(() => {
      card.unsubscribe();
    });
  }
}
