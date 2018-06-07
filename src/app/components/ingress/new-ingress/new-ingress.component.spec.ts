import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngressComponent } from './new-ingress.component';

describe('NewIngressComponent', () => {
  let component: NewIngressComponent;
  let fixture: ComponentFixture<NewIngressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIngressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIngressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
