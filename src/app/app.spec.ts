import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { App } from './app';
import { ShipmentService } from './services/shipment-service';
import { WebsocketService } from './services/websocket-service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: ShipmentService,
          useValue: {
            getAllShipments: () => of([]),
          },
        },
        {
          provide: WebsocketService,
          useValue: {
            connect: () => undefined,
            isConnected: () => of(false),
            getStatusUpdates: () => of(null),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Universcience brand', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')?.textContent).toContain('universcience');
  });
});
