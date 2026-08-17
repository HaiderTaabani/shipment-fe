import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ShipmentGrid } from './shipment-grid';
import { ShipmentService } from '../services/shipment-service';
import { WebsocketService } from '../services/websocket-service';

describe('ShipmentGrid', () => {
  let component: ShipmentGrid;
  let fixture: ComponentFixture<ShipmentGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentGrid],
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
            getStatusUpdates: () => of(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
