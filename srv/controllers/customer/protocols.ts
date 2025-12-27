import { BaseControllerResponse } from '@/controllers/base';
import { Customer } from '@models/sales';
import { Customers } from '@cds-models';

export interface CustomerController {
    afterRead(customerList: Customer): BaseControllerResponse;
}
