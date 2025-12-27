// Expondo a entidade SalesOrderHeaders

// traz o pacote inteiro que está no namespace sales
using { sales } from '../../db/schema';
using { db.types.SalesReport, db.types.BulkCreateSalesOrder } from  '../../db/types';

@requires: 'authenticated-user'
@path: '/sales-order'
service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders actions{
        action cloneSalesOrder() returns Boolean;
    };
    entity Customers as projection on sales.Customers actions {
        function getSalesReportByCustomerId() returns array of SalesReport.ExpectedResult;
    };
    entity Products as projection on sales.Products;
    entity SalesOrderLogs as projection on sales.SalesOrderLogs;
    entity SalesOrderStatuses as projection on sales.SalesOrderStatuses;
}

// Functions
extend service MainService with {
    function getSalesReportByDays(days: SalesReport.Params:days) returns  array of SalesReport.ExpectedResult;
}

// Actions
extend service MainService with {
    action bulkCreateSalesOrders(payload: array of BulkCreateSalesOrder.Payload) returns array of BulkCreateSalesOrder.ExpectedResult;
}
