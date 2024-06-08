import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FavoriteJobService } from './favorite-job.service';

describe('FavoriteJobService', () => {
  let service: FavoriteJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(FavoriteJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
