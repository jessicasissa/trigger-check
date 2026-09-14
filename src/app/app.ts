import { Component, signal } from '@angular/core';
import { CardList } from "./components/card-list/card-list";

@Component({
  selector: 'app-root',
  imports: [CardList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mtg-project');
}
