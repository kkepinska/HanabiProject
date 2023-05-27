import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockRoomComponent } from './mock-room.component';

describe('MockRoomComponent', () => {
  let component: MockRoomComponent;
  let fixture: ComponentFixture<MockRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
