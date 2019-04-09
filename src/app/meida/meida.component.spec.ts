import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeidaComponent } from './meida.component';

describe('MeidaComponent', () => {
  let component: MeidaComponent;
  let fixture: ComponentFixture<MeidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
