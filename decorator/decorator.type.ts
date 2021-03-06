import {Middleware} from "./middleware.ts";
import {DecorationApplication} from "./application.ts";
import {Router} from "./router.ts";
import {ListenOptions, ReqMethod, MiddlewareFunc, MethodFuncArgument} from "../model.ts";

export declare type Entity = {
  app: DecorationApplication | null,
  router: Router | null,
  server: ListenOptions,
  middleware: Middleware | null,
  routes: Array<{
    path: string;
    method: ReqMethod,
    middleware: MiddlewareFunc[],
    handler: Function,
  }>;
  middlewares: MethodFuncArgument;
};
