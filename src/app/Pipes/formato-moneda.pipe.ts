import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoMoneda',
})
export class FormatoMonedaPipe implements PipeTransform {
  transform(currency: number): string {
    return currency.toString().replace(/,/g, '.');
  }
}
