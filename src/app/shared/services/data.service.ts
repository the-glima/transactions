import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { apiConfig } from '@app/app.config';
import { Transaction } from '@app/shared/models';

@Injectable()
export class DataService {

  constructor(
    private httpClient: HttpClient,
  ) {}

  getTranscations() {
    const params = new HttpParams();

    return this.httpClient.get(apiConfig.url, {params}).pipe(
      map((response: Response) => {
        const data: any = response;

        const transactions: Transaction = data.map(transaction => {
          return {
            id: transaction.id,
            action: transaction.action,
            amount: transaction.amount,
            brandId: transaction.brandId,
            currencyCode: transaction.currencyCode,
            trackingCode: transaction.trackingCode,
            card: {
              expiryMonth: transaction.card.expiryMonth,
              expiryYear: transaction.card.expiryYear,
              firstSixDigits: transaction.card.firstSixDigits,
              lastFourDigits: transaction.card.lastFourDigits,
              holderName: transaction.card.holderName
            }
          };
        });

        return transactions;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  handleError(error: any) {
    console.log(error);
    return error;
  }
}