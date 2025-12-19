// fazendo importação
using { managed } from '@sap/cds/common';

// identificador das entidades
namespace sales;

// entidade e atributos, implementando o aspect
entity SalesOrderHeaders: managed{
    // PK
    key id: UUID;
}