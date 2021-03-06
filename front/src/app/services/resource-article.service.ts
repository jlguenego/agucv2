import { Injectable } from '@angular/core';
import { Resource } from '../abstract/resource';
import { Article } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResourceArticleService extends Resource<Article> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('/ws/articles');
  }
}
