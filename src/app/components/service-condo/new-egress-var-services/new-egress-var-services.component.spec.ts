import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEgressVarServicesComponent } from './new-egress-var-services.component';

describe('NewEgressVarServicesComponent', () => {
  let component: NewEgressVarServicesComponent;
  let fixture: ComponentFixture<NewEgressVarServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEgressVarServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEgressVarServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
