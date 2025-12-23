import { SalesReportController } from '@/controllers/sales-report/protocols';
import { SalesReportControllerImpl } from '@/controllers/sales-report/implementation';
import { salesReportService } from '@/factories/services/sales-report';

export const makeSalesReportControle = (): SalesReportController => {
    return new SalesReportControllerImpl(salesReportService);
};

export const salesReportController = makeSalesReportControle();
