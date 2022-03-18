import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMusicasComponent } from './editar-musicas.component';

describe('EditarMusicasComponent', () => {
  let component: EditarMusicasComponent;
  let fixture: ComponentFixture<EditarMusicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMusicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMusicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
