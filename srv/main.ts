import cds, { Request, Service } from '@sap/cds';
import { Customers, Products, SalesOrderHeader, SalesOrderHeaders, SalesOrderItem, SalesOrderItems } from '@models/sales';
import { customerController } from './factories/controllers/customer';
import { salesOrderHeaderController } from './factories/controllers/sales-order-header';
import {FullRequestParams} from './protocols';

export default (service: Service) => {
    service.before('READ', '*', (request: Request) => {
        if(!request.user.is('read_only_user')){
            return request.reject(403, 'Não autorizado');
        }
    });

    service.before(['WRITE', 'DELETE'], '*', (request: Request) => {
        if(!request.user.is('read_only_user')){
            return request.reject(403, 'Não autorizada a escrita/deleção');
        }
    });

    service.after('READ', 'Customers', (customersList: Customers, request) => {
        (request as unknown as FullRequestParams<Customers>).results = customerController.afterRead(customersList);
        
        //results.forEach(customer => {
        //    if (!customer.email?.includes('@')){
        //        customer.email = `${customer.email}@gmail.com`;
        //    }
        //})
    });

    service.before('CREATE', 'SalesOrderHeaders', async (request: Request) => {
        const params = request.data;
        const result = await salesOrderHeaderController.beforeCreate(params);
        if(result.hasError){
            return request.reject(400, result.error?.message as string);
        }
        
        //const items: SalesOrderItems = params.items;
        //console.log(params);
        //// se não tiver parâmetros
        //if(!params.customer_id){
        //    return request.reject(400, 'Customer inválido');
        //}
        //if(!params.items || params.items?.length === 0){
        //    return request.reject(400, 'Items inválidos');
        //}
//
        //// quer saber se o customer já existe na base de dados
        //const customerQuery = SELECT.one.from('sales.Customers').where({id: params.customer_id});
        //const customer = await cds.run(customerQuery);
        //if(!customer){
        //    return request.reject(404, 'Customer não encontrado');
        //}
//
        //// pega os produtos do banco
        //const productsIds: string[] = params.items.map((item: SalesOrderItem) => item.product_id);
        //const productQuery = SELECT.from('sales.Products').where({id: productsIds});
        //const products: Products = await cds.run(productQuery);
        //for(const item of items){
        //    const dbProduct = products.find(product => product.id === item.product_id);
        //
        //    if(!dbProduct){
        //        return request.reject(404, `Produto ${item.product_id} não encontrado`);
        //    }
//
        //    if(dbProduct.stock === 0){
        //        return request.reject(400, `Produto ${dbProduct.name} (${dbProduct.id}) sem estoque disponível`);
        //    }
        //}
//
        //let totalAmount = 0;
        //items.forEach(item => {
        //    totalAmount += (item.price as number) * (item.quantity as number);
        //});
        //console.log(`Antes do desconto: ${result.totalAmount}`);
        //if(totalAmount > 30000){
        //    const discount = totalAmount * (10/100)
        //    totalAmount = totalAmount - (discount);
        //}
        //console.log(`Depois do desconto: ${result.totalAmount}`);
        request.data.totalAmount = result.totalAmount;
    });
    service.after('CREATE', 'SalesOrderHeaders', async (results: SalesOrderHeaders, request: Request) => {
        const headersAsArray = Array.isArray(results) ? results : [results] as SalesOrderHeaders;

        for(const header of headersAsArray){
            const items = header.items as SalesOrderItems;

            const productsData = items.map(item => ({
                id: item.product_id as string,
                quantity: item.quantity as number
            }));
            const productsIds: string[] = productsData.map((productData) => productData.id);
            const productQuery = SELECT.from('sales.Products').where({id: productsIds});
            const products: Products = await cds.run(productQuery);
            for(const productData of productsData){
                const foundProduct = products.find(product => product.id === productData.id) as Products[number];
                foundProduct.stock = (foundProduct.stock as number) - productData.quantity;
                await cds.update('sales.Products').where({id: foundProduct.id}).with({stock: foundProduct.stock});
            }   

            const headersAsString = JSON.stringify(header);
            const userAsString = JSON.stringify(request.user);
            const log = [{
                header_id: header.id,
                userData: userAsString,
                orderData: headersAsString
            }];
            await cds.create('sales.SalesOrderLogs').entries(log);
        }
    });  
}

