import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEgressServicesComponent } from './new-egress-services.component';

describe('NewEgressServicesComponent', () => {
  let component: NewEgressServicesComponent;
  let fixture: ComponentFixture<NewEgressServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEgressServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEgressServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
