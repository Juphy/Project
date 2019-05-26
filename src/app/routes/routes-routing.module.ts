import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LayoutComponent } from "@layout/layout.component";
import { environment } from "@env/environment";
import { MainComponent } from "./main/main.component";
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", loadChildren: "./login/login.module#LoginModule" },
  {
    path: "console",
    component: LayoutComponent,
    children: [
      { path: "main", component: MainComponent },
      { path: "news", loadChildren: "./news/news.module#NewsModule" },
      { path: "system", loadChildren: "./system/system.module#SystemModule" },
      { path: "user", loadChildren: "./user/user.module#UserModule" },
      { path: "cash", loadChildren: "./cash/cash.module#CashModule" },
      { path: "role", loadChildren: "./role/role.module#RoleModule" },
      {
        path: "manager",
        loadChildren: "./manager/manager.module#ManagerModule"
      },
      { path: "batch", loadChildren: "./batch/batch.module#BatchModule" },
      { path: "pay", loadChildren: "./pay/pay.module#PayModule" }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      environment.production ? { preloadingStrategy: PreloadAllModules } : {}
    )
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
