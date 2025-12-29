import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Profil } from './profil';

describe('Profil', () => {
  let component: Profil;
  let fixture: ComponentFixture<Profil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profil, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
