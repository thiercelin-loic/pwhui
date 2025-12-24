import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  filterItems<T>(items: T[], query: string, getSearchableText: (item: T) => string): T[] {
    if (!query || query.length <= 2) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      getSearchableText(item).toLowerCase().includes(lowerQuery)
    );
  }
}
