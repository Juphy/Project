import { AddRangeComponent } from './add-range/add-range.component';
import { AddMapComponent } from "./add-map/add-map.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { RangeComponent } from './range/range.component';

const routes: Routes = [
  { path: "map", component: MapComponent },
  { path: "range", component: RangeComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [MapComponent, AddMapComponent, RangeComponent, AddRangeComponent],
  entryComponents: [AddMapComponent, AddRangeComponent]
})
export class SystemModule { }
