import { CustomerModel } from '@/models/customer';
import { ProductModel } from '@/models/product';
import { SalesOrderHeaderModel } from '@/models/sales-order-header';
import { User } from '@cds-models';

import { Payload as BuckCreateSalesOrderPayload } from '@models/db/types/BulkCreateSalesOrder';
import { SalesOrderHeader } from '@models/sales';

export type CreationPayloadValidationResult = {
    hasError: boolean;
    totalAmount?: number;
    products?: ProductModel[];
    customer?: CustomerModel;
    error?: Error;
    headers?: BuckCreateSalesOrderPayload[];
};

export interface SalesOrderHeaderService {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPayloadValidationResult>;
    afterCreate(params: SalesOrderHeader, loggedUser: User): Promise<void>;
    bulkCreate(headers: BuckCreateSalesOrderPayload[], loggedUser: User): Promise<CreationPayloadValidationResult>;
}
