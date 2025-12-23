import { SalesOrderLogModel } from "srv/models/sales-order-log"
import { SalesOrderLogRepository } from "./protocols"
import { create } from "axios"
import cds from "@sap/cds";

export class SalesOrderLogRepositoryImpl implements SalesOrderLogRepository{
    public async create(logs: SalesOrderLogModel[]): Promise<void>{
        const logObjects = logs.map(log => log.toObject());
        await cds.create('sales.SalesOrderLogs').entries(logObjects);
    }
}