import { TestBed } from '@angular/core/testing';

import { FriendFormService } from './friend-form.service';

describe('FriendFormService', () => {
  let service: FriendFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
