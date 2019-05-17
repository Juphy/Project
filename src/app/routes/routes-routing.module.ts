import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from '@layout/layout.component';
import { environment } from '@env/environment';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'albums', pathMatch: 'full' },
            { path: 'albums', loadChildren: './albums/albums.module#AlbumsModule' },
            // {path: '**', component: PageNotFoundComponent}
        ]
    },
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, environment.production ? { preloadingStrategy: PreloadAllModules } : {})], //  预加载所有路由
    imports: [RouterModule.forRoot(routes, environment.production ? { preloadingStrategy: PreloadAllModules } : {})],
    exports: [RouterModule]
})
export class RouteRoutingModule {
}
