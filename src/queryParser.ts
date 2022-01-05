import { ParsedQs as ReqQuery } from "qs";
import { FindOptions, Op, OrderItem } from "sequelize";


interface IndexedQueryOperator {
    [key: string]: string | number | boolean | IndexedQueryOperator | IndexedQueryOperator[];
}

interface IndexedQuery {
    [op: string]: IndexedQueryOperator;
}


const sequelizeOps: { [key: string]: any } = {
    "gt": Op.gt,
    "gte": Op.gte,
    "lt": Op.lt,
    "lte": Op.lte,
    "eq": Op.eq,
    "!eq": Op.ne,
    "like": Op.like,
    "!like": Op.notLike,
    "between": Op.between,
    "!between": Op.notBetween,
    "in": Op.in,
    "!in": Op.notIn,
    or: Op.or,
    and: Op.and,
}


function castTypeValue(value: string) {
    if (/^true$/i.test(value)) {
        return true;

    } else if (/^false$/i.test(value)) {
        return false;

    } else if (!isNaN(Number(value))) {
        return Number(value);
    }

    return value;
}


function transformValue(value: string) {
    if (/\*/g.test(value)) {
        return value.replace(/\*/g, "%");
    }

    return value;
}


function getQueryValueAttrs(queryValues: string, operator: string, isOrorAnd = false) {
    const valuesAttrs = queryValues.split(",");
    const query: IndexedQueryOperator | IndexedQueryOperator[] = !isOrorAnd ? {} : [];

    for (const valueAttr of valuesAttrs) {
        const [attrName, valueAtrr] = valueAttr.split(":");

        if (!isOrorAnd) {
            (query as IndexedQueryOperator)[attrName] = {
                [operator]: castTypeValue(transformValue(valueAtrr))
            }

        } else {
            const valuesArr = valueAtrr.split("-")

            for (const value of valuesArr) {
                (query as IndexedQueryOperator[]).push({
                    [attrName]: {
                        [operator]: castTypeValue(transformValue(value))
                    }
                })
            }
        }
    }

    return query;
}


function getQueryValueAttrsAndorOr(queryValues: IndexedQueryOperator) {
    const ArrayParsedQuery: IndexedQueryOperator[] = [];

    for (const keyOp in queryValues) {
        const operator = sequelizeOps[keyOp];
        const queryValue = queryValues[keyOp] as string;
        const querys = getQueryValueAttrs(queryValue, operator, true) as IndexedQueryOperator[];

        querys.forEach((query) => {
            ArrayParsedQuery.push(query);
        });
    }

    return ArrayParsedQuery
}


function getGroupBy(groupBy: string) {
    return groupBy.split(",")
}


function getFields(fields: string) {
    return fields.split(",")
}


function getSortBy(groupBy: string) {
    return groupBy.split(",").map((sortBy) => {
        const [attrName, sortOrder] = sortBy.split(":");

        return [attrName, sortOrder === "desc" ? "DESC" : "ASC"] as OrderItem;
    })
}


export function queryParser(query: ReqQuery): FindOptions {
    let parsedQuery: IndexedQuery = {};
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.offset ? Number(query.offset) : undefined;
    const fields = query.fields ? getFields(query.fields as string) : undefined;
    const sortBy = query.sort_by ? getSortBy(query.sort_by as string) : undefined;
    const groupBy = query.group_by ? getGroupBy(query.group_by as string) : undefined;


    for (const keyOp in query) {
        const operator = sequelizeOps[keyOp];

        if (operator == undefined) {
            continue;
        }

        const queryValues = query[keyOp];

        if (typeof queryValues === "string") {
            parsedQuery = {
                ...parsedQuery,
                ...getQueryValueAttrs(queryValues, operator)
            } as IndexedQuery;


        } else if (typeof queryValues === "object") {
            parsedQuery = {
                ...parsedQuery,
                ...{ [operator]: getQueryValueAttrsAndorOr(queryValues as IndexedQueryOperator) }
            };
        }
    }

    return {
        limit: limit,
        order: sortBy,
        offset: offset,
        group: groupBy,
        where: parsedQuery,
        attributes: fields,
    };
}