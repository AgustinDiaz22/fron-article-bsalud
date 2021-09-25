import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';


import { HomeComponent } from './pages/home/home.component';
import { FilterArticlePipe } from './pipes/filter-article.pipe';
import { ModalArticleComponent } from './pages/modalArticle/modal-article/modal-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterMovementPipe } from './pipes/filter-movement.pipe';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterArticlePipe,
    ModalArticleComponent,
    FilterMovementPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  exports:[
    ModalArticleComponent
  ],
  entryComponents: [ModalArticleComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
