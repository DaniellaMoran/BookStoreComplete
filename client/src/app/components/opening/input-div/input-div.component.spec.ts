import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDivComponent } from './input-div.component';

describe('InputDivComponent', () => {
  let component: InputDivComponent;
  let fixture: ComponentFixture<InputDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
