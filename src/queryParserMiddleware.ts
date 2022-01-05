import { NextFunction, Request, Response } from "express";
import { queryParser } from "./queryParser";

// export middleware
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function queryParserMiddleware(req: Request, res: Response, next: NextFunction) {
  req.queryParsed = queryParser({ ...req.query });

  next();
}