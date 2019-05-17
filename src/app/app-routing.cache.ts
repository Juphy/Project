import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class AppRoutingCache implements RouteReuseStrategy {

    public handlers: { [key: string]: DetachedRouteHandle } = {};

    // 表示对路由允许复用
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // 默认对所有路由复用 可通过给路由配置项增加data: { keep: true } 来进行选择性使用，代码如下
        // 如果是懒加载路由需要在生命组件的位置进行配置
        if (!route.data.keep) {
            return false;
        }
        return true;
    }

    // 当路由离开时会触发。按path作为key存储路由快照& 组件当前实例对象
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.handlers[route.routeConfig.path] = handle;
    }

    // 若path在缓存中有的都认为允许还原路由
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }

    // 从缓存中获取快照，若无则返回null
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) return null;
        if (route.routeConfig.loadChildren) return null;  //在loadChildren路径上通过修改自定义RouteReuseStrategy中的检索函数时从不检索分离的路由。
        return this.handlers[route.routeConfig.path];
    }

    // 进入路由触发，判断是否同一路由
    shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === current.routeConfig;
    }
}