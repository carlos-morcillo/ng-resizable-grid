import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableGridComponent } from './resizable-grid.component';

describe('ResizableGridComponent', () => {
  let component: ResizableGridComponent;
  let fixture: ComponentFixture<ResizableGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizableGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
