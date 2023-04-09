import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizerHandlerComponent } from './resizer-handler.component';

describe('ResizerHandlerComponent', () => {
  let component: ResizerHandlerComponent;
  let fixture: ComponentFixture<ResizerHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizerHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizerHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
