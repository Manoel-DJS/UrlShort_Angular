import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextApiComponent } from './input-text-api.component';

describe('InputTextApiComponent', () => {
  let component: InputTextApiComponent;
  let fixture: ComponentFixture<InputTextApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTextApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
