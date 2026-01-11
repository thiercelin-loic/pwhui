import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class TranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, public prefix = 'languages/', public suffix = '.json') {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, 'languages/', '.json');
}