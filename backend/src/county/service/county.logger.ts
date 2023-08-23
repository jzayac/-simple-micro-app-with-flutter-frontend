import Context from '../../lib/context';
import { ILogger } from '../../types/logger';

import {
  IService,
  IGetCountyTreeRequest as treeParams
} from '../../types/county';

export default class LoggerService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async getCountyTree(ctx: Context, params: treeParams) {
    const start = Date.now();

    const respose = await this.service.getCountyTree(ctx, params);

    this.logger.info(
      JSON.stringify({
        method: 'getCountyTree',
        params: params,
        took: Date.now() - start
      })
    );

    return respose;
  }
}
