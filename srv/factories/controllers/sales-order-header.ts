import { SalesOrderHeaderController } from '@/controllers/sales-order-header/protocol';
import { SalesOrderHeaderControllerImpl } from '@/controllers/sales-order-header/implementation';
import { salesOrderHeaderService } from '@/factories/services/sales-order-header';

export const makeSalesOrderHeaderControle = (): SalesOrderHeaderController => {
    return new SalesOrderHeaderControllerImpl(salesOrderHeaderService);
};

export const salesOrderHeaderController = makeSalesOrderHeaderControle();
