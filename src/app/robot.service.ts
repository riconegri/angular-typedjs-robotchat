import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Robot } from './robot';
// import { Answer } from './answer'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RobotService {

  private robotUrl = 'https://dev-api.oiwarren.com/api/v2/conversation/message';  // URL to web api
  private finishUrl = 'https://dev-api.oiwarren.com/api/v2/suitability/finish';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** PUT: update the robot on the server */
  updateRobot (answer: any, finish?: any): Observable<any> {

    return this.http.post(
      finish ? this.finishUrl : this.robotUrl, answer, httpOptions
    ).pipe(
      tap(_ => this.log(answer)),
      catchError(this.handleError<any>('updateRobot'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
  }
}
