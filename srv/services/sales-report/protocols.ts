import { AbstractError } from '@/errors';
import { Either } from '@sweet-monads/either';
import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';

export interface SalesReportService {
    findByDays(days: number): Promise<Either<AbstractError, SalesReportByDays[]>>;
    findByCustomerId(customerId: string): Promise<Either<AbstractError, SalesReportByDays[]>>;
}
