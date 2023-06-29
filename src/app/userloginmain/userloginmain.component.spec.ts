import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginmainComponent } from './userloginmain.component';

describe('UserloginmainComponent', () => {
  let component: UserloginmainComponent;
  let fixture: ComponentFixture<UserloginmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserloginmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserloginmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
