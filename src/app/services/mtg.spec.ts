import { TestBed } from '@angular/core/testing';

import { MtgService } from './mtg';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ScryfallResponse } from '../models/scryfall-response';
import { Card } from '../models/card';
import { firstValueFrom } from 'rxjs';

describe('Mtg', () => {
  let service: MtgService;
  let httpTesting: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MtgService);
    httpTesting = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpTesting.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should map id, name and oracle_text from Scryfall response', async () => {
    const MOCK_SCRYFALL: ScryfallResponse = {
      id: '10',
      name: 'Eon Hub',
      image_uris: { art_crop: 'https://cards.scryfall.io/art_crop/front/d/5/d5d6b270-b4c9-489d-9322-7c8ddc0ca0ac.jpg?1783944381'},
      oracle_text: 'Players skip their upkeep steps.',
      type_line: 'Artifact'
    };

    const cardPromise = firstValueFrom(service.searchCardByName('Eon Hub'));
    const req = httpTesting.expectOne('https://api.scryfall.com/cards/named?fuzzy=eon%20hub');

    expect(req.request.method).toBe('GET');
    req.flush(MOCK_SCRYFALL);

    const card = await cardPromise;

    expect(card.id).toBe('10');
    expect(card.name).toBe('Eon Hub');
    expect(card.image).toBe('https://cards.scryfall.io/art_crop/front/d/5/d5d6b270-b4c9-489d-9322-7c8ddc0ca0ac.jpg?1783944381');
    expect(card.oracle_text).toBe('Players skip their upkeep steps.');
  });

  it('should return fallback image when image_uris is missing', async() => {
    const MOCK_SCRYFALL: ScryfallResponse = {
      id: '10',
      name: 'Eon Hub',
      oracle_text: 'Players skip their upkeep steps.',
      type_line: 'Artifact'
    };
    
    const cardPromise = firstValueFrom(service.searchCardByName('Eon Hub'));
    const req = httpTesting.expectOne('https://api.scryfall.com/cards/named?fuzzy=eon%20hub');

    expect(req.request.method).toBe('GET');
    req.flush(MOCK_SCRYFALL);

    const card = await cardPromise;

    expect(card.image).toBe('https://placehold.co/300x200');
  });

  it('should return an empty string when oracle_text is missing', async() => {
    const MOCK_SCRYFALL: ScryfallResponse = {
      id: '10',
      name: 'Eon Hub',
      image_uris: { art_crop: 'https://cards.scryfall.io/art_crop/front/d/5/d5d6b270-b4c9-489d-9322-7c8ddc0ca0ac.jpg?1783944381'},
      type_line: 'Artifact'
    };
    
    const cardPromise = firstValueFrom(service.searchCardByName('Eon Hub'));
    const req = httpTesting.expectOne('https://api.scryfall.com/cards/named?fuzzy=eon%20hub');

    expect(req.request.method).toBe('GET');
    req.flush(MOCK_SCRYFALL);

    const card = await cardPromise;

    expect(card.oracle_text).toBe('');
  });

  it('should return a friendly message in case of API error', async() => {
    const cardPromise = firstValueFrom(service.searchCardByName('Eon Hub'));
    const req = httpTesting.expectOne('https://api.scryfall.com/cards/named?fuzzy=eon%20hub');

    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 404, statusText: 'Not Found'});

    await expect(cardPromise).rejects.toThrow('Carta não encontrada. Verifique o nome e tente novamente.');
  });
});
