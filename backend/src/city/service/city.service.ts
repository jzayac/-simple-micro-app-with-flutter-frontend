import Context from '../../lib/context';
import { ILogger } from '../../types/logger';

import {
  IService,
  IGetCityTreeRequest as treeParams,
  ICityTreeRespose,
  IRepository
} from '../../types/city';

export default class SearchService implements IService {
  private logger: ILogger;
  private repository: IRepository;

  constructor(logger: ILogger, broker: any, repository: IRepository) {
    this.logger = logger;
    this.repository = repository;
  }

  async getCityTree(ctx: Context, params: treeParams): Promise<ICityTreeRespose[]> {
    const data = await this.repository.getCityTree(ctx, params.countyId);

    return data;
  }
}
