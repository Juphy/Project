import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouteRoutingModule } from "./routes-routing.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [NotfoundComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RoutesModule { }
