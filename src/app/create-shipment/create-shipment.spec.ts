import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShipment } from './create-shipment';
import { ShipmentService } from '../services/shipment-service';

describe('CreateShipment', () => {
  let component: CreateShipment;
  let fixture: ComponentFixture<CreateShipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShipment],
      providers: [{ provide: ShipmentService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateShipment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when required fields are empty', () => {
    expect(component.shipmentForm.invalid).toBe(true);
  });

  it('should be valid when required fields are correctly filled', () => {
    component.shipmentForm.patchValue({
      origin: 'Paris',
      destination: 'Lyon',
    });

    expect(component.shipmentForm.valid).toBe(true);
  });
});
