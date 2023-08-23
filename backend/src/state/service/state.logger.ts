import Context from '../../lib/context';
import { ILogger } from '../../types/logger';

import { IService, IStateTreeRespose, IGetStateTreeRequest as treeParams } from '../../types/state';

export default class LoggerService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async getCountyTreeByCallingMs(ctx: Context, params: treeParams): Promise<IStateTreeRespose> {
    const start = Date.now();

    const respose = await this.service.getCountyTreeByCallingMs(ctx, params);

    this.logger.info(
      JSON.stringify({
        method: 'getCountyTreeByCallingMs',
        params: params,
        took: Date.now() - start,
      })
    );

    return respose;
  }

  async getStateTree(ctx: Context, params: treeParams): Promise<IStateTreeRespose> {
    const start = Date.now();

    const respose = await this.service.getStateTree(ctx, params);

    this.logger.info(
      JSON.stringify({
        method: 'getStateTree',
        params: params,
        took: Date.now() - start + 'ms',
      })
    );

    return respose;
  }
}
