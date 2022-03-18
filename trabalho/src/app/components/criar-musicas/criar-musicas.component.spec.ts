import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarMusicasComponent } from './criar-musicas.component';

describe('CriarMusicasComponent', () => {
  let component: CriarMusicasComponent;
  let fixture: ComponentFixture<CriarMusicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarMusicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarMusicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
