import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSlotComponent } from './job-slot.component';

describe('JobSlotComponent', () => {
  let component: JobSlotComponent;
  let fixture: ComponentFixture<JobSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
