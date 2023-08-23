import Context from '../../lib/context';
import { ILogger } from '../../types/logger';

import { IService, ICityTreeRespose, IGetCityTreeRequest as treeParams } from '../../types/city';

export default class LoggerService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async getCityTree(ctx: Context, params: treeParams) {
    const start = Date.now();

    const respose = await this.service.getCityTree(ctx, params);

    this.logger.info(
      JSON.stringify({
        method: 'getCityTree',
        params: params,
        took: Date.now() - start
      })
    );

    return respose;
  }
}
