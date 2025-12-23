import { CustomerModel, CustomerProps } from '@/models/customer';

export interface CustomerRepository {
    findById(id: string): Promise<CustomerModel | null>;
}
