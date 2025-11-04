import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Start } from './start';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Start', () => {
  let component: Start;
  let fixture: ComponentFixture<Start>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Start, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Start);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
