import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { CmsService } from './cms.service';

describe('CmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}).compileComponents());

  it('should be created', () => {
    const service: CmsService = TestBed.get(CmsService);
    expect(service).toBeTruthy();
  });
});
