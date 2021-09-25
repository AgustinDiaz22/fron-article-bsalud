import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ModalArticleComponent } from './pages/modalArticle/modal-article/modal-article.component';
export const _routes: Routes = [
  {
    path: '', component: HomeComponent,

  },
  {
    path: 'inicio',
    component: HomeComponent,

  },
  {
    path:'modal-article',
    component: ModalArticleComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
 