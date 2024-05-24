/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from "apps/vshosting-todo/src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { getServiceName } from "../utils";

@Injectable({ providedIn: "root" })
export abstract class BaseHttpService<T, TKey = number> {
  constructor(protected readonly httpClient: HttpClient) {}

  protected get basePath(): string {
    return `${environment.apiUrl}/${getServiceName(this.constructor.name)}`;
  }

  fetchList(queryParams?: HttpParams): Observable<T[]> {
    return this.httpClient.get<T[]>(this.basePath, { params: queryParams });
  }

  get(id: TKey, url?: string): Observable<T> {
    if (url) {
      return this.httpClient.get<T>(`${this.basePath}/${url}/${id}`);
    }
    return this.httpClient.get<T>(`${this.basePath}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.httpClient.post<T>(this.basePath, entity);
  }

  update(id: TKey, entity: T): Observable<T> {
    return this.httpClient.put<T>(`${this.basePath}/${id}`, entity);
  }

  delete(id: TKey): Observable<any> {
    return this.httpClient.delete(`${this.basePath}/${id}`);
  }
}
