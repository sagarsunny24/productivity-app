import colors from 'colors';
import type { RequestHandler } from 'express';
type Method = "GET" |"POST" | "PUT" | "DELETE" | "PATCH"
type ColorName = "green" |"blue" | "yellow" | "red" | "magenta"
const logger:RequestHandler  = (req, res, next) => {
  const methodColors : Record<Method,ColorName> = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
    PATCH: 'magenta'
  };
  const method = req.method as Method
  const color  = methodColors[method] ?? 'white'

  const log = `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const colorFn = colors[color]
  console.log(colorFn(log));

  next();
};

export default logger;