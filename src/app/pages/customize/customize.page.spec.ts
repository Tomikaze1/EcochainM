import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomizePage } from './customize.page';

describe('CustomizePage', () => {
  let component: CustomizePage;
  let fixture: ComponentFixture<CustomizePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
