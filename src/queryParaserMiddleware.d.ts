import { FindOptions } from "sequelize";

declare global {
    namespace Express {
        export interface Request {
            queryParsed: FindOptions;
        }
    }
}