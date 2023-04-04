import { Component } from '@angular/core';
import { SelectComponent } from 'src/app/feature/home/select/select.component';
import { GridListComponent } from './grid-list/grid-list.component';

@Component({
  selector: 'app-home',
  imports: [SelectComponent, GridListComponent],
  template: `<div>
    <app-select></app-select>
    <app-grid-list></app-grid-list>
  </div>`,
  standalone: true,
})
export default class HomeComponent {}
