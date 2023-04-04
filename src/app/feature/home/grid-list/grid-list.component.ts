import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TeamService } from 'src/app/core/services/provider/team/team.service';
import { TrackedTeam } from 'src/app/shared/models/tracked-team.model';

@Component({
  selector: 'app-grid-list',
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
  ],
  standalone: true,
  template: ` <div
    *ngIf="teamService.trackedTeams$ | async as trackedTeams"
    nz-row
    [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32 }"
  >
    <nz-card
      nz-col
      nzHoverable
      nzSpan="12"
      *ngFor="let team of trackedTeams"
      [nzActions]="[avatarTemplate]"
    >
      <span class="x" (click)="removeTrackedTeam(team)">x</span>
      <img
        src="https://interstate21.com/nba-logos/{{ team.abbreviation }}.png"
      />
      <h3>{{ team.name }} [{{ team.abbreviation }}]</h3>
      <p>{{ team.conference === 'East' ? 'Eastern' : 'Western' }} conference</p>
      <div>
        <nz-tag
          *ngFor="let res of team.results"
          nzColor="{{ res.result === 'W' ? 'success' : 'error' }}"
          >{{ res.result }}</nz-tag
        >
      </div>
      <nz-divider></nz-divider>
      <div class="score">
        <div class="up">
          <span nz-icon nzType="arrow-up" nzTheme="outline"></span>
          {{ getAverageScored(team) }}
        </div>
        <div class="down">
          <span nz-icon nzType="arrow-down" nzTheme="outline"></span>
          {{ getAverageConceded(team) }}
        </div>
      </div>
      <ng-template #avatarTemplate>
        <div [routerLink]="['/results', team.id]">See Game results >></div>
      </ng-template>
    </nz-card>
  </div>`,
  styles: [
    `
      .x {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 1rem;
        cursor: pointer;
        font-size: 1.5rem;
        :hover {
          color: red;
        }
      }
      .score {
        display: flex;
        .up,
        .down {
          width: 50%;
        }

        .up span {
          color: green;
        }
        .down span {
          color: red;
        }
      }
      nz-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
      }
      img {
        width: 5rem;
      }
    `,
  ],
})
export class GridListComponent {
  teamService = inject(TeamService);

  removeTrackedTeam = (team: TrackedTeam) => {
    this.teamService.removeTrackedTeam(team.id);
  };

  getAverageScored = (team: TrackedTeam) =>
    Math.floor(
      team.results.reduce((acc, curr) => acc + curr.points_scored, 0) /
        team.results.length
    );

  getAverageConceded = (team: TrackedTeam) =>
    Math.floor(
      team.results.reduce((acc, curr) => acc + curr.points_conceded, 0) /
        team.results.length
    );
}
