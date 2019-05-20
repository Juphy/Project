import { NgModule } from "@angular/core";
import { RouteRoutingModule } from "./routes-routing.module";
import { SharedModule } from "@shared/shared.module";
import { MainComponent } from "./main/main.component";

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [MainComponent]
})
export class RoutesModule {}
