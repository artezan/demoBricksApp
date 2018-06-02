
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMenuComponent } from './general-menu.component';

describe('GeneralMenuComponent', () => {
  let component: GeneralMenuComponent;
  let fixture: ComponentFixture<GeneralMenuComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
