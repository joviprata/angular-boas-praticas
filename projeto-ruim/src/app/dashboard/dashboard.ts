import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  // ChangeDetectionStrategy.Default mantido implicitamente
})
export class DashboardComponent implements OnInit {
  colaboradores: any[] = [];
  eventosAoVivo: string[] = [];
  histograma: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.gerarLista();
    this.gerarHistograma();
    this.iniciarFeedComMemoryLeak();
  }

  gerarLista() {
    const hoje = new Date().getFullYear();
    
    const iconesDisponiveis = [
      'backpack.svg', 'binoculars.svg', 'box-seam.svg', 'brush.svg', 'bug.svg',
      'cloud-fog2.svg', 'dice-3.svg', 'emoji-smile.svg', 'flask.svg', 'plug.svg'
    ];

    // Subimos a barra para 5.000 para asfixiar o Virtual DOM do Angular
    for (let i = 1; i <= 5000; i++) {
      const iconeAleatorio = iconesDisponiveis[Math.floor(Math.random() * iconesDisponiveis.length)];
      const anoContratacao = 2015 + (i % 10);
      const salarioAleatorio = Math.floor(Math.random() * 15000) + 2000;

      this.colaboradores.push({
        id: i,
        nome: `Colaborador ${i}`,
        departamento: i % 2 === 0 ? 'Tecnologia' : 'Gente e Gestão',
        salario: salarioAleatorio,
        anosEmpresa: hoje - anoContratacao,
        icone: iconeAleatorio
      });
    }
  }

  gerarHistograma() {
    // Calculado apenas uma vez na inicialização
    const faixas = { 'Até 5k': 0, '5k a 10k': 0, 'Acima de 10k': 0 };
    
    for (const colab of this.colaboradores) {
      if (colab.salario <= 5000) faixas['Até 5k']++;
      else if (colab.salario <= 10000) faixas['5k a 10k']++;
      else faixas['Acima de 10k']++;
    }
    
    const total = this.colaboradores.length;
    this.histograma = [
      { label: 'Até R$ 5.000', count: faixas['Até 5k'], percent: (faixas['Até 5k'] / total) * 100 },
      { label: 'R$ 5.000 a R$ 10.000', count: faixas['5k a 10k'], percent: (faixas['5k a 10k'] / total) * 100 },
      { label: 'Acima de R$ 10.000', count: faixas['Acima de 10k'], percent: (faixas['Acima de 10k'] / total) * 100 }
    ];
  }

  iniciarFeedComMemoryLeak() {
    interval(1000).subscribe(() => {
      const id = Math.floor(Math.random() * 5000) + 1;
      const novoEvento = `Colab. ${id} bateu o ponto!`;
      
      this.eventosAoVivo = [novoEvento, ...this.eventosAoVivo];
      if (this.eventosAoVivo.length > 20) {
        this.eventosAoVivo.pop();
      }

      this.gerarHistograma();
      
      // O CRIME REAL: Sem trackBy, isso aqui força a deleção e 
      // recriação de 5.000 blocos de HTML na memória a cada segundo.
      this.colaboradores = [...this.colaboradores];

      this.cdr.detectChanges();
    });
  }
}