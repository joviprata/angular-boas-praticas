import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPesado } from '../grafico-pesado/grafico-pesado';

describe('GraficoPesado', () => {
  let component: GraficoPesado;
  let fixture: ComponentFixture<GraficoPesado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoPesado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoPesado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
