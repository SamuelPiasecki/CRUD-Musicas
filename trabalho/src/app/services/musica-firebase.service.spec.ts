import { TestBed } from '@angular/core/testing';

import { MusicaFirebaseService } from './musica-firebase.service';

describe('MusicaFirebaseService', () => {
  let service: MusicaFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicaFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
