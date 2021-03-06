import {
  Req,
  Res,
  HandlerFunc,
  MiddlewareFunc
} from '../deps.ts';
export const routerMiddleware = (): MiddlewareFunc => {
  return async (req, res, next) => {
    const time1 = performance.now();
    await next();
    const time2 = performance.now();
    res.headers.set('router-response-time', (time2 - time1).toString());
  }
}
export const testCookie: HandlerFunc = (req, res) => {
  // parse map to object
  console.log(req.cookies.toObj());
  // name value options
  res.cookies.append('name', 'fangbing', {
    domain: '127.0.0.1',
    secure: true
  });
  res.cookies.append('age', '22', {
    domain: '127.0.0.1',
    httpOnly: true
  });
  res.body = {
    name: 'test-cookie',
    cookies: req.cookies.toObj()
  }
}
export const testDynamicRoute: HandlerFunc = (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.body = {
    name: 'test-data-dynamic',
    isDynamic: true,
    params: req.params
  }
};

export const postData = (req: Req, res: Res) => {
  res.body = {
    data: req.body,
    name: 'post-data',
    isPost: true
  }
}

export const redirect = (req: Req, res: Res) => {
  res.redirect('/');
}

export const render = async (req: Req, res: Res) => {
  await res.render('template/index.html');
}

