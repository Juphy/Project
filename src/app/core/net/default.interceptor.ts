import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";
import { NzMessageService, NzNotificationService } from "ng-zorro-antd";
import { siteinfo, DATA } from "@core/store";

const CODEMESSAGE = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => (window.location.href = url), 300);
    // setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(event: HttpResponseBase): Observable<any> {
    switch (event.status) {
      case 200:
        let body = event["body"];
        switch (body.status) {
          case 400:
            this.msg.error(body.message);
            break;
        }
        break;
      case 400: // 客服端错误
        this.msg.warning(event["error"]["message"]);
        break;
      case 401:
        this.msg.warning(event["error"]["message"]);
        break;
      case 403:
        this.msg.error(event["error"]["message"]);
        break;
      case 500: //服务端错误
        let message = event["error"]["message"];
        if (message.includes("Token")) {
          this.goTo(siteinfo.site + "/login");
        }
        this.msg.error(event["error"]["message"]);
        break;
    }
    return of(event);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = siteinfo.api + "/" + req.url;
    if (req.url !== "api/manager_login") {
      req = req.clone({
        url: url,
        setHeaders: {
          Authorization: "Bearer " + DATA["TOKEN"]
        }
      });
    } else {
      req = req.clone({
        url
      });
    }
    return next.handle(req).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase && event.status === 200)
          return this.handleData(event);
        return of(event);
      }),
      catchError((err: any) => {
        if (err instanceof HttpResponseBase) {
          this.handleData(err);
          return throwError(err); // 在抛出错误以便捕获
        }
      })
    );
  }
}
