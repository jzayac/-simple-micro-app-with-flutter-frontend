import Context from '../../lib/context';
import * as Err from '../../lib/error';
import { ILogger } from '../../types/logger';

import {
  IService,
  IGetCountyTreeRequest as treeParams
} from '../../types/county';

export default class ErrorService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async getCountyTree(ctx: Context, params: treeParams) {
    try {
      return await this.service.getCountyTree(ctx, params);
    } catch (err) {
      if (!(err instanceof Err.BaseError)) {
        this.logger.error('unhandled error', err);
        throw new Err.InternalError('unknown error');
      } else {
        this.logger.error(err.message, err);
      }

      throw err;
    }
  }
}
