import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard'; // 1. Adicione este import!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent], // 2. Coloque o componente aqui!
  templateUrl: './app.html',
})
export class AppComponent { 
  title = 'projeto-vilao';
}