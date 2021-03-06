import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { faRedo, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';

import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../interfaces/article';
import { interval, Observable, of } from 'rxjs';
import {
  AppState,
  selectArticle,
  selectArticleError,
  selectArticleLoading,
} from '../reducers';
import { loadArticles, removeArticle } from '../actions/article.actions';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  faRedo = faRedo;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  selectedArticles = [] as Article[];
  articles$ = this.store.pipe(select(selectArticle));

  error = '';
  loading = false;

  constructor(private store: Store<AppState>) {
    this.store
      .pipe(select(selectArticleError))
      .subscribe((err) => (this.error = err));
    this.store
      .pipe(select(selectArticleLoading))
      .subscribe((loading) => (this.loading = loading));
  }

  ngOnInit(): void {}

  toggle(article: Article): void {
    if (this.selectedArticles.includes(article)) {
      const index = this.selectedArticles.findIndex((a) => a === article);
      this.selectedArticles.splice(index, 1);
      return;
    }
    this.selectedArticles.push(article);
  }

  remove(): void {
    console.log('remove');
    // this.articleService.remove(this.selectedArticles);
    this.store.dispatch(
      removeArticle({ data: this.selectedArticles.map((a) => a.id as string) })
    );
    this.selectedArticles.length = 0;
  }

  refresh(): void {
    console.log('refresh');
    this.store.dispatch(loadArticles());
  }
}
