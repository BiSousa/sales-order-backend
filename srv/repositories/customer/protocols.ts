import { CustomerModel, CustomerProps } from "srv/models/customer";

export interface CustomerRepository{
    findById(id: string):Promise<CustomerModel | null>;
}