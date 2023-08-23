import { IRepository, ICityTreeRespose } from '../../types/city';
import Context from '../../lib/context';
// import { BadRequestError, InternalError } from "../../lib/error";
import { ILogger } from '../../types/logger';
import { prisma } from '../../lib/database';

export class Repository implements IRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async getCityTree(ctx: Context, countyId: number): Promise<ICityTreeRespose[]> {
    const data = await prisma.city.findMany({
      where: {
        countyId
      },
      select: {
        cityName: true,
      }
    });

    if (!data) {
      throw new Error('No data found');
    }

    return data;
  }
}
