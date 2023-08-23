import Context from '../../lib/context';
import * as Err from '../../lib/error';
import { ILogger } from '../../types/logger';
import { IService, IStateTreeRespose, IGetStateTreeRequest as treeParams } from '../../types/state';

export default class ErrorService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async getCountyTreeByCallingMs(ctx: Context, params: treeParams): Promise<IStateTreeRespose> {
    try {
      return await this.service.getCountyTreeByCallingMs(ctx, params);
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

  async getStateTree(ctx: Context, params: treeParams): Promise<IStateTreeRespose> {
    try {
      return await this.service.getStateTree(ctx, params);
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
