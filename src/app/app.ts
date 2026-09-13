import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardList } from "./components/card-list/card-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mtg-project');
}
