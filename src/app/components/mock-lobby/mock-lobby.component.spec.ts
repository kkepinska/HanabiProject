import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockLobbyComponent } from './mock-lobby.component';

describe('MockLobbyComponent', () => {
  let component: MockLobbyComponent;
  let fixture: ComponentFixture<MockLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockLobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
