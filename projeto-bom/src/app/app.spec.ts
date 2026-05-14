import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('deve criar a aplicação corretamente', () => {
    // Arrange: Preparamos os valores esperados.
    const tituloEsperado = 'projeto-bom';

    // Act: Agimos sobre a aplicação para obter o estado atual (acessando o signal)
    const tituloAtual = component['title']();

    // Assert: Validamos se a ação teve o resultado esperado
    expect(component).toBeTruthy();
    expect(tituloAtual).toBe(tituloEsperado);
  });
});
