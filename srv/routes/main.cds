// Expondo a entidade SalesOrderHeaders

// traz o pacote inteiro que está no namespace sales
using { sales } from '../../db/schema';

@requires: 'authenticated-user'
service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
    entity Customers as projection on sales.Customers;
    entity Products as projection on sales.Products;
    entity SalesOrderLogs as projection on sales.SalesOrderLogs;
    entity SalesOrderStatuses as projection on sales.SalesOrderStatuses;
}
