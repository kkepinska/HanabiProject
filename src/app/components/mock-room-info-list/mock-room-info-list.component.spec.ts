import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockRoomInfoListComponent } from './mock-room-info-list.component';

describe('MockRoomInfoListComponent', () => {
  let component: MockRoomInfoListComponent;
  let fixture: ComponentFixture<MockRoomInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockRoomInfoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockRoomInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
