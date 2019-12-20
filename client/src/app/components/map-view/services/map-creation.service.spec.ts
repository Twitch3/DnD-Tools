import { TestBed } from '@angular/core/testing';

import { MapCreationService } from './map-creation.service';

describe('MapCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapCreationService = TestBed.get(MapCreationService);
    expect(service).toBeTruthy();
  });
});
