import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { of } from 'rxjs';

declare const vi: any;

class MockUsuarioService {
  buscarUsuarios() { 
    return of<any[]>([{ nome: 'Vazio' }]);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockService: MockUsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: MockUsuarioService, useClass: MockUsuarioService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    mockService = TestBed.inject(MockUsuarioService);

    fixture.detectChanges();
  });

  it('deve buscar os usuários via serviço', () => {
    // Arrange (Preparar)
    vi.spyOn(mockService, 'buscarUsuarios').mockReturnValue(of([{ nome: 'Jovi' }]));

    // Act (Agir)
    const resultado$ = mockService.buscarUsuarios();

    // Assert (Validar)
    expect(mockService.buscarUsuarios).toHaveBeenCalled();
    resultado$.subscribe(usuarios => {
      expect(usuarios.length).toBe(1);
      expect(usuarios[0].nome).toBe('Jovi');
    });
  });
});
