import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { map, switchMap } from 'rxjs';
import { TeamService } from '../../../core/services/provider/team/team.service';

@Component({
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    NgIf,
    NzButtonModule,
  ],
  selector: 'app-select',
  template: `<div class="select">
    <nz-select
      id="teamSelect"
      nzShowSearch
      nzPlaceHolder="Select a team"
      [formControl]="selectedTeamControlId"
      *ngIf="teams | async as teams"
    >
      <nz-option
        nzCustomContent
        *ngFor="let team of teams"
        nzLabel="{{ team.name }}"
        nzValue="{{ team.id }}"
      >
        <img
          src="https://interstate21.com/nba-logos/{{ team.abbreviation }}.png"
        />
        {{ team.name }}
      </nz-option>
    </nz-select>
    <button
      id="trackBtn"
      nz-button
      nzType="primary"
      (click)="addNewTrackedTeam()"
    >
      Track Team
    </button>
  </div>`,
  styles: [
    `
      .select {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
      }
      nz-select {
        width: 20rem;
      }
      img {
        width: 2rem;
      }
    `,
  ],
})
export class SelectComponent {
  #teamService = inject(TeamService);
  selectedTeamControlId = new FormControl<number | null>(null);

  teams = this.#teamService.retriveTeams().pipe(map((teams) => teams.data));

  addNewTrackedTeam() {
    this.#teamService
      .retriveTeamById(this.selectedTeamControlId.value!)
      .pipe(switchMap((team) => this.#teamService.addNewTrackedTeam(team)))
      .subscribe((newTrackedTeams) => {
        console.log(newTrackedTeams);
        this.#teamService.trackedTeams$.next([
          ...this.#teamService.trackedTeams$.value,
          newTrackedTeams,
        ]);
      });
  }
}
