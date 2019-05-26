import { AddRangeComponent } from "./add-range/add-range.component";
import { AddMapComponent } from "./add-map/add-map.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { RangeComponent } from "./range/range.component";
import { SumComponent } from "./sum/sum.component";
import { RuleComponent } from "./rule/rule.component";
import { IntroduceComponent } from "./introduce/introduce.component";

const routes: Routes = [
  { path: "map", component: MapComponent },
  { path: "range", component: RangeComponent },
  { path: "sum", component: SumComponent },
  { path: "rule", component: RuleComponent },
  { path: "introduce", component: IntroduceComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    MapComponent,
    AddMapComponent,
    RangeComponent,
    AddRangeComponent,
    SumComponent,
    IntroduceComponent,
    RuleComponent
  ],
  entryComponents: [AddMapComponent, AddRangeComponent]
})
export class SystemModule {}
