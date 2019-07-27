import { TestBed } from '@angular/core/testing';

import { GroupmenusService } from './groupmenus.service';

describe('GroupmenusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupmenusService = TestBed.get(GroupmenusService);
    expect(service).toBeTruthy();
  });
});
