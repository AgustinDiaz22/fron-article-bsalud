import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../pages/interfaces/articles.interfaces';
@Pipe({
  name: 'filterArticle'
})
export class FilterArticlePipe implements PipeTransform {

  // transform(value: any, args: any): any {
  //   const resultArticle = [];
  //   // value = value.toLowerCase()
  //   console.log(value)
  //   for(const post of value){
  //     if(post.arNombre.toLowerCase().indexOf(args.toLowerCase()) > -1){
  //       resultArticle.push(post)
  //     }
  //   }
  //   return resultArticle;
  // }
  transform(articles: Article[], page: number = 0, search: string = ''): any[] {
    if (search.length === 0)
      return articles.slice(page, page + 5);

    const filteredPokemons = articles.filter(r => r.arNombre.toLowerCase().includes(search.toLowerCase()));
    return filteredPokemons.slice(page, page + 5);

  }

}
