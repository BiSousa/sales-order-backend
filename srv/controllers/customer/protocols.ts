import { Customers } from "@cds-models";
import { Customer } from "@models/sales";

export interface CustomerController{
    afterRead(customerList: Customer): Customers;
}