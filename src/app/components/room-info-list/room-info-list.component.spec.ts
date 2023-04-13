import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInfoListComponent } from './room-info-list.component';

describe('RoomInfoListComponent', () => {
  let component: RoomInfoListComponent;
  let fixture: ComponentFixture<RoomInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomInfoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
