import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominiosListComponent } from './condominios-list.component';

describe('CondominiosListComponent', () => {
  let component: CondominiosListComponent;
  let fixture: ComponentFixture<CondominiosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondominiosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondominiosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
