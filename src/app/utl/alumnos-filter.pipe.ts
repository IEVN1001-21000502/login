import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumnosFilter',
  standalone: true
})
export class AlumnosFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
