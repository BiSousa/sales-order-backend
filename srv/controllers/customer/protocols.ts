import { Customer } from '@models/sales';
import { Customers } from '@cds-models';

export interface CustomerController {
    afterRead(customerList: Customer): Customers;
}
