import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpLoaderFactory } from '@app/shared/translate-loader';
import { Policy } from './policy';

describe('Policy', () => {
  let component: Policy;
  let fixture: ComponentFixture<Policy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Policy,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Policy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
