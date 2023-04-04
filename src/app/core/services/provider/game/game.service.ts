import { inject, Injectable } from '@angular/core';
import { eachDayOfInterval, format, sub } from 'date-fns';
import { GameDataService } from '../../data-providers/game-data/game-data.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly #gameDataService = inject(GameDataService);

  retriveGamesByTeamId(id: number) {
    const last12Days = eachDayOfInterval({
      start: sub(new Date(), { days: 12 }),
      end: new Date(),
    }).map((date) => format(date, 'yyyy-MM-dd'));

    return this.#gameDataService.getGamesByTeamId(id, last12Days);
  }
}
