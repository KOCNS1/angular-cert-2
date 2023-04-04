import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Game } from 'src/app/shared/models/games.model';
import { Team } from 'src/app/shared/models/teams.model';
import { TrackedTeam } from 'src/app/shared/models/tracked-team.model';
import { TeamDataService } from '../../data-providers/team-data/team-data.service';
import { GameService } from '../game/game.service';

@Injectable({ providedIn: 'root' })
export class TeamService {
  #teamDataService = inject(TeamDataService);
  #gameService = inject(GameService);
  trackedTeams$ = new BehaviorSubject<TrackedTeam[]>([]);

  addNewTrackedTeam = (selected: Team) => {
    return this.#gameService.retriveGamesByTeamId(selected?.id as number).pipe(
      map((data) => {
        return {
          id: selected?.id,
          name: selected?.name,
          abbreviation: selected?.abbreviation,
          conference: selected?.conference,
          results: data.data.map((game) => {
            if (this.isHomeTeam(game, selected as Team)) {
              return {
                result:
                  game.home_team_score > game.visitor_team_score ? 'W' : 'L',
                points_scored: game.home_team_score,
                points_conceded: game.visitor_team_score,
              };
            }
            return {
              result:
                game.visitor_team_score > game.home_team_score ? 'W' : 'L',
              points_scored: game.visitor_team_score,
              points_conceded: game.home_team_score,
            };
          }),
        } as TrackedTeam;
      })
    );
  };

  removeTrackedTeam = (id: number) => {
    this.trackedTeams$.next(
      this.trackedTeams$.getValue().filter((team) => team.id !== id)
    );
  };

  isHomeTeam = (game: Game, selectedTeam: Team) =>
    game.home_team.id === selectedTeam.id;

  retriveTeams() {
    return this.#teamDataService.getTeams();
  }

  retriveTeamById(id: number) {
    return this.#teamDataService.getTeamById(id);
  }
}
