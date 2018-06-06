import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditDepaComponent } from './new-edit-depa.component';

describe('NewEditDepaComponent', () => {
  let component: NewEditDepaComponent;
  let fixture: ComponentFixture<NewEditDepaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditDepaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditDepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
