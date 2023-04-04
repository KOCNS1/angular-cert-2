import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Team, TeamResponse } from 'src/app/shared/models/teams.model';

@Injectable({ providedIn: 'root' })
export class TeamDataService {
  #http = inject(HttpClient);

  getTeams() {
    return this.#http.get<TeamResponse>('/teams');
  }

  getTeamById(id: number) {
    return this.#http.get<Team>(`/teams/${id}`);
  }
}
