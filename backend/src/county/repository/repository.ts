import { IRepository, ICountyTreeRepository } from '../../types/county';
import Context from '../../lib/context';
import { ILogger } from '../../types/logger';
import { prisma } from '../../lib/database';

export class Repository implements IRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async getCountyTree(ctx: Context, stateId: number): Promise<ICountyTreeRepository[]> {
    const data = await prisma.county.findMany({
      where: {
        stateId
      },
      select: {
        id: true,
        countyName: true,
        // City: {
        //   select: {
        //     cityName: true
        //   }
        // }
      }
    });

    if (!data) {
      throw new Error('No data found');
    }

    return data;
  }
}
