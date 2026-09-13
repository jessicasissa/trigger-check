import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ScryfallResponse } from '../models/scryfall-response';
import { catchError, map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MtgService {
  private httpClient = inject(HttpClient);

  getRandomCard() {
    return this.fetchCards(
      'https://api.scryfall.com/cards/random', 
      'Ops, algo deu errado ao buscar uma carta aleatória. Tente novamente mais tarde.'
    );
  }

  searchCardByName(name: string) {
    return this.fetchCards (
      `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name.toLowerCase())}`,
      'Carta não encontrada. Verifique o nome e tente novamente.'
    );
  }

  private fetchCards(url: string, msg: string) {
    return this.httpClient.get<ScryfallResponse>(url)
      .pipe(
        map((resData) => ({ 
              id: resData.id,
              name: resData.name,
              image: resData.image_uris?.art_crop || 'https://placehold.co/300x200',
              oracle_text: resData.oracle_text ?? '',
            })
        ),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => 
              new Error (msg)
          );
        })
      )
  }
}
