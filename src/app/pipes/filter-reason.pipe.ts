import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../pages/interfaces/articles.interfaces';

@Pipe({
  name: 'filterreason'
})
export class FilterreasonPipe implements PipeTransform {

  transform(articles: Article[], page: number = 0, search: string = ''): any[] {
    if (search.length === 0)
      return articles.slice(page, page + 5);

    const filteredPokemons = articles.filter(r =>
      r.name.toLowerCase()
        .includes(search.toLowerCase()));
    return filteredPokemons.slice(page, page + 5);

  }

}
