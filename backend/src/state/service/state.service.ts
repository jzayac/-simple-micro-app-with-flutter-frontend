import Context from '../../lib/context';
import { ILogger } from '../../types/logger';

import { IService as ICountyService } from '../../types/county';
import {
  IService,
  IGetStateTreeRequest as treeParams,
  IStateTreeRespose,
  IRepository
} from '../../types/state';

export default class SearchService implements IService {
  private logger: ILogger;
  private broker: { county: ICountyService };
  private repository: IRepository;

  constructor(logger: ILogger, broker: { county: ICountyService }, repository: IRepository) {
    this.logger = logger;
    this.repository = repository;
    this.broker = broker;
  }

  async getCountyTreeByCallingMs(ctx: Context, product: treeParams): Promise<IStateTreeRespose> {
    const data = await this.repository.getState(ctx, product.stateName);

    const response = await this.broker.county.getCountyTree(ctx, { stateId: data.id });

    const normalizedData = {
      [data.stateName]: response.map((county: any) => {
        return {
          [county.countyName]: county.City.map((city: any) => city.cityName)
        };
      })
    };

    return normalizedData;
  }

  async getStateTree(ctx: Context, product: treeParams): Promise<IStateTreeRespose> {
    const data = await this.repository.getStateTree(ctx, product.stateName);

    const normalizedData = {
      [data.stateName]: data.County.map((county) => {
        return {
          [county.countyName]: county.City.map((city) => city.cityName)
        };
      })
    };

    return normalizedData;
  }
}
