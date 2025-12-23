// fazendo importação
using { managed } from '@sap/cds/common';

// identificador das entidades
namespace sales;

// entidade e atributos, implementando o aspect
entity SalesOrderHeaders: managed{
    // PK
    key id: UUID;
        customer: Association to Customers;
        totalAmount: Decimal(15,2);
        items: Composition of many SalesOrderItems on items.header = $self;
        status: Association to SalesOrderStatuses;
}

entity SalesOrderItems {
    key id: UUID;
        header: Association to SalesOrderHeaders;
        product: Association to Products;
        quantity: Integer;
        price: Decimal(15,2);
}

entity SalesOrderLogs: managed{
    key id: UUID;
        header: Association to SalesOrderHeaders;
        userData: LargeString;
        orderData: LargeString;
}

entity SalesOrderStatuses {
    key id: String enum{
        COMPLETED = 'COMPLETED';
        PENDING = 'PENDING';
        REJECTED = 'REJECTED';
    };
    description: localized String;
}

entity Customers{
    key id: UUID;
        firstName: String(20);
        lastName: String(100);
        email: String(255);
        salesOrders: Association to many SalesOrderHeaders on salesOrders.customer = $self;
}

entity Products{
    key id: UUID;
        name: String(255);
        price: Decimal(15,2);
        stock: Integer;
}