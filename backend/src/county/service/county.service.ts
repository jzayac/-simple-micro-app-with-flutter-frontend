import Context from '../../lib/context';
import { ILogger } from '../../types/logger';

import {
  IService,
  IGetCountyTreeRequest as treeParams,
  ICountyTreeRespose,
  IRepository
} from '../../types/county';
import { IService as ICityService } from '../../types/city';

export default class SearchService implements IService {
  private logger: ILogger;
  private repository: IRepository;
  private broker: { city: ICityService };

  constructor(logger: ILogger, broker: any, repository: IRepository) {
    this.logger = logger;
    this.repository = repository;
    this.broker = broker;
  }

  async getCountyTree(ctx: Context, params: treeParams): Promise<ICountyTreeRespose[]> {
    const data = await this.repository.getCountyTree(ctx, params.stateId);

    const result: ICountyTreeRespose[] = [];

    for (const county of data) {
      const cities = await this.broker.city.getCityTree(ctx,{countyId: county.id});
      result.push({
        countyName: county.countyName,
        City: cities
      });
    }

    return result;
  }
}
