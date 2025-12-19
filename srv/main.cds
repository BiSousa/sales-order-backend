// Expondo a entidade SalesOrderHeaders

// traz o pacote inteiro que está no namespace sales
using { sales } from '../db/schema';

service MainService{
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
}