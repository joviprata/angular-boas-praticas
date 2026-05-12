import { Component, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  colaboradoresBase = signal<any[]>([]);
  eventosAoVivo = signal<string[]>([]);

  // Agrupamento em linhas de 3 para o Virtual Scroll ser compatível com Grid
  colaboradoresAgrupados = computed(() => {
    const lista = this.colaboradoresBase();
    const linhas = [];
    for (let i = 0; i < lista.length; i += 3) {
      linhas.push(lista.slice(i, i + 3));
    }
    return linhas;
  });

  histograma = computed(() => {
    const lista = this.colaboradoresBase();
    const faixas = { 'Até 5k': 0, '5k a 10k': 0, 'Acima de 10k': 0 };
    for (const colab of lista) {
      if (colab.salario <= 5000) faixas['Até 5k']++;
      else if (colab.salario <= 10000) faixas['5k a 10k']++;
      else faixas['Acima de 10k']++;
    }
    const total = lista.length || 1;
    return [
      { label: 'Até R$ 5.000', count: faixas['Até 5k'], percent: (faixas['Até 5k'] / total) * 100 },
      { label: 'R$ 5.000 a R$ 10.000', count: faixas['5k a 10k'], percent: (faixas['5k a 10k'] / total) * 100 },
      { label: 'Acima de R$ 10.000', count: faixas['Acima de 10k'], percent: (faixas['Acima de 10k'] / total) * 100 }
    ];
  });

  constructor() {
    interval(1000).pipe(takeUntilDestroyed()).subscribe(() => {
      const id = Math.floor(Math.random() * 5000) + 1;
      this.eventosAoVivo.update(v => [`Colab. ${id} bateu o ponto!`, ...v].slice(0, 20));
    });
  }

  ngOnInit() {
    const hoje = new Date().getFullYear();
    const novaLista = [];
    for (let i = 1; i <= 5000; i++) {
      novaLista.push({
        id: i,
        nome: `Colaborador ${i}`,
        departamento: i % 2 === 0 ? 'Tecnologia' : 'Gente e Gestão',
        salario: Math.floor(Math.random() * 15000) + 2000,
        anosEmpresa: hoje - (2015 + (i % 10))
      });
    }
    this.colaboradoresBase.set(novaLista);
  }

  trackByLinha(index: number, linha: any[]) { return linha[0].id; }
}