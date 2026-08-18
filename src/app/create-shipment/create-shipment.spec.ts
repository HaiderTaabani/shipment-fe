import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { CreateShipment } from './create-shipment';
import { ShipmentService } from '../services/shipment-service';

describe('CreateShipment', () => {
  let component: CreateShipment;
  let fixture: ComponentFixture<CreateShipment>;
  const shipmentServiceMock = {
    createShipment: vi.fn(() => of(null)),
  };

  beforeEach(async () => {
    shipmentServiceMock.createShipment.mockClear();

    await TestBed.configureTestingModule({
      imports: [CreateShipment],
      providers: [{ provide: ShipmentService, useValue: shipmentServiceMock }],
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

  it('should not call the service when the form is invalid', () => {
    component.createShipment();

    expect(shipmentServiceMock.createShipment).not.toHaveBeenCalled();
  });

  it('should call the service with the form data when the form is valid', () => {
    component.shipmentForm.setValue({
      origin: 'Paris',
      destination: 'Lyon',
      estimatedDelivery: '2026-08-20',
    });

    component.createShipment();

    expect(shipmentServiceMock.createShipment).toHaveBeenCalledWith({
      origin: 'Paris',
      destination: 'Lyon',
      estimatedDelivery: '2026-08-20',
    });
  });
});
