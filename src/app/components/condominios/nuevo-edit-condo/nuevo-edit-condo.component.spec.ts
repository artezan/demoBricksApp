import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEditCondoComponent } from './nuevo-edit-condo.component';

describe('NuevoEditCondoComponent', () => {
  let component: NuevoEditCondoComponent;
  let fixture: ComponentFixture<NuevoEditCondoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoEditCondoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEditCondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
