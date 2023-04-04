import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GamesResponse } from 'src/app/shared/models/games.model';

@Injectable({ providedIn: 'root' })
export class GameDataService {
  #http = inject(HttpClient);

  getGamesByTeamId(id: number, dates: string[]) {
    const params = new HttpParams({
      fromObject: {
        'team_ids[]': id,
        page: 0,
        'dates[]': dates,
      },
    });
    return this.#http.get<GamesResponse>(`/games`, {
      params,
    });
  }
}
