import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpLoaderFactory } from '@app/shared/translate-loader';
import { Contract } from './contract';

describe('Contract', () => {
  let component: Contract;
  let fixture: ComponentFixture<Contract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Contract,
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

    fixture = TestBed.createComponent(Contract);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
