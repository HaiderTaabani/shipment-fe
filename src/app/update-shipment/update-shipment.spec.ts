import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UpdateShipment } from './update-shipment';
import { ShipmentService } from '../services/shipment-service';

describe('UpdateShipment', () => {
  let component: UpdateShipment;
  let fixture: ComponentFixture<UpdateShipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateShipment],
      providers: [
        {
          provide: ShipmentService,
          useValue: {
            getAllShipments: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateShipment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
