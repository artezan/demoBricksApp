import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEgressFixedComponent } from './new-egress-fixed.component';

describe('NewEgressFixedComponent', () => {
  let component: NewEgressFixedComponent;
  let fixture: ComponentFixture<NewEgressFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEgressFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEgressFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
