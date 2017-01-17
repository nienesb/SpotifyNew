// truncate.ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform{
  transform(value: string, args: string) : string {

    let limit = parseInt(args, 10);
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
