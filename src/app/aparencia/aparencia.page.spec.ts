import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AparenciaPage } from './aparencia.page';

describe('AparenciaPage', () => {
  let component: AparenciaPage;
  let fixture: ComponentFixture<AparenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AparenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
