import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { forkJoin, map, switchMap } from 'rxjs';
import { GameService } from 'src/app/core/services/provider/game/game.service';
import { TeamService } from 'src/app/core/services/provider/team/team.service';

@Component({
  selector: 'app-results',
  imports: [
    NzGridModule,
    NgFor,
    NgIf,
    AsyncPipe,
    NzCardModule,
    NzTagModule,
    NzDividerModule,
    NzIconModule,
    RouterModule,
    NzTableModule,
  ],
  standalone: true,
  template: ` <div
    *ngIf="teamResults | async as res"
    nz-row
    [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32 }"
  >
    <nz-card nzHoverable [nzActions]="[avatarTemplate]">
      <img
        src="https://interstate21.com/nba-logos/{{ res[1].abbreviation }}.png"
      />
      <h3>{{ res[1].name }} [{{ res[1].abbreviation }}]</h3>
      <p>
        {{ res[1].conference === 'East' ? 'Eastern' : 'Western' }} conference
      </p>
      <nz-table #basicTable nzShowPagination="false" [nzData]="res[0].data">
        <thead>
          <tr>
            <th>Team 1</th>
            <th>Score</th>
            <th>Score</th>
            <th>Team 2</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let data of basicTable.data">
            <td>{{ data.home_team.abbreviation }}</td>
            <td>{{ data.home_team_score }}</td>
            <td>{{ data.visitor_team_score }}</td>
            <td>{{ data.visitor_team.abbreviation }}</td>
          </tr>
        </tbody>
      </nz-table>
      <ng-template #avatarTemplate>
        <div id="backBtn" [routerLink]="['/home']">
          >> Back to all team stats
        </div>
      </ng-template>
    </nz-card>
  </div>`,
  styles: [
    `
      nz-table {
        width: 100%;
      }
      nz-card {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 100%;
      }
      img {
        width: 5rem;
      }
    `,
  ],
})
export default class ResultsComponent {
  teamService = inject(TeamService);
  gameService = inject(GameService);
  route = inject(ActivatedRoute);

  // why can't we just use the id istead of the abbreviation/teamCode?
  teamResults = this.route.paramMap.pipe(
    map((params) => params.get('teamCode')),
    switchMap((code) =>
      this.teamService
        .retriveTeams()
        .pipe(
          map((teams) => teams.data.find((team) => team.abbreviation === code))
        )
    ),
    switchMap((team) =>
      forkJoin([
        this.gameService.retriveGamesByTeamId(team!.id),
        this.teamService.retriveTeamById(team!.id),
      ])
    )
  );
}
