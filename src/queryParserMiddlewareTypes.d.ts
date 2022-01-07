import { FindOptions } from "sequelize";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        export interface Request {
            queryParsed: FindOptions;
        }
    }
}


export function queryParserMiddleware(req: Request, res: Response, next: NextFunction): void;
