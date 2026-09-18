import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from '../../models/card';
import { CardList } from './card-list';
import { MtgService } from '../../services/mtg';
import { Mock } from 'vitest';
import { of } from 'rxjs';

describe('CardList', () => {
    let component: CardList;
    let fixture: ComponentFixture<CardList>;
    let mockMtg: { searchCardByName: ReturnType<typeof vi.fn> };
    
    const MOCK_CARD: Card = {
        id: '10',
        name: 'Eon Hub',
        image: 'https://placehold.co/300x200',
        oracle_text: 'Players skip their upkeep steps.',
    };

    beforeEach(async () => {
        mockMtg = { searchCardByName: vi.fn() };

        await TestBed.configureTestingModule({
        imports: [CardList],
        providers: [{provide: MtgService, useValue: mockMtg }]
        }).compileComponents();

    fixture = TestBed.createComponent(CardList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CardList);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not call the service when the search term is empty', () => {
    component.onSearchTermChange('  ');
    expect(mockMtg.searchCardByName).not.toHaveBeenCalled();
    expect(component.isLoading()).toBe(false);
  });

  it('should populate selectedCard when the search succeeds', async () => {
    mockMtg.searchCardByName.mockReturnValue(of(MOCK_CARD));
    component.onSearchTermChange('Eon Hub');
    expect(component.selectedCard()).toEqual(MOCK_CARD);
  });
});