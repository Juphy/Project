import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";

const routes: Routes = [{ path: "map", component: MapComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [MapComponent]
})
export class SystemModule {}
