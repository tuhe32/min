import {
  getRouterInitial,
  getRoutes,
  setApp,
  setRoutes,
  clearRoutes,
  setServer,
  getMiddlewareInitial,
  getMiddlewares,
  setMiddlewares,
  clearMiddlewares,
} from "./entity.ts";
import {App} from "./app.ts";
import {DecorationApplication} from "./application.ts";
import {ListenOptions, MethodFuncArgument} from "../model.ts";

const consumeApplication: ClassDecorator = (target: Function) => {
  const middleware = getMiddlewareInitial();
  const router = getRouterInitial();
  const path = target.prototype.decorator_prefix_min || '';
  getMiddlewares().forEach(val => {
    middleware.push(val);
  });
  getRoutes().forEach(val => {
    router[val.method](path + val.path, val.handler, val.middleware);
  });
  clearMiddlewares();
  clearRoutes();
}

const consumeRoutes: ClassDecorator = (target: Function) => {
  const router = getRouterInitial();
  const path = target.prototype.decorator_prefix_min || '';
  getRoutes().forEach(val => {
    router[val.method](path + val.path, val.handler, getMiddlewares().concat(val.middleware));
  });
  clearMiddlewares();
  clearRoutes();
}

const StartApplication: ClassDecorator = target => {
  setApp(new DecorationApplication());
  consumeApplication(target);
  return target;
}

const Route: ClassDecorator = target => {
  consumeRoutes(target);
  return target;
}

const Prefix = (path: string): ClassDecorator => {
  return target => {
    target.prototype.decorator_prefix_min = path;
    return target;
  }
}

const Middleware: MethodDecorator = (target, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
  setMiddlewares(descriptor.value);
  return descriptor;
}

const ApplyMiddleware = (args: MethodFuncArgument): MethodDecorator => {
  args.forEach(val => {
    setMiddlewares(val);
  });
  return (target, propertyKey, descriptor) => {
    return descriptor;
  }
}

const Start = (server: ListenOptions): MethodDecorator => {
  setServer(server);
  return (target, propertyKey, descriptor) => {
    return descriptor;
  }
}

const Get = (path: string, args?: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'get',
    });
    return descriptor;
  }
}

const Post = (path: string, args?: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'post',
    });
    return descriptor;
  }
}

const Delete = (path: string, args: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'delete',
    });
    return descriptor;
  }
}

const Put = (path: string, args?: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'put',
    });
    return descriptor;
  }
}

const Patch = (path: string, args?: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'patch',
    });
    return descriptor;
  }
}

const Options = (path: string, args?: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'options',
    });
    return descriptor;
  }
}

const Head = (path: string, args?: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'head',
    });
    return descriptor;
  }
}

const Connect = (path: string, args?: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'connect',
    });
    return descriptor;
  }
}

const Trace = (path: string, args?: MethodFuncArgument): MethodDecorator => {
  return function (target, propertyKey, descriptor: any) {
    setRoutes({
      middleware: args || [],
      handler: descriptor.value,
      path,
      method: 'trace',
    });
    return descriptor;
  }
}

export {StartApplication, App, Prefix, Start, Get, Post, Delete, Put, Route, Middleware, Patch, Options, Head, Connect, Trace, ApplyMiddleware};
