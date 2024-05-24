import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Todo } from '../../models';
import { environment } from 'apps/vshosting-todo/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService extends BaseHttpService<Todo, string> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  override fetchList() {
    return super.fetchList(
      new HttpParams().set('clientId', environment.clientId),
    );
  }
  override create(entity: Todo): Observable<Todo> {
    return super.create({ ...entity, clientId: environment.clientId });
  }

  markAllAsCompleted(): Observable<void> {
    return this.httpClient.patch<void>(
      `${this.basePath}/mark-all-as-completed`,
      { clientId: environment.clientId},
    );
  }
}
