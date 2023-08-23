import Context from '../../lib/context';

import {
  IService,
  IStateTreeRespose,
  IGetStateTreeRequest as treeParams,
  getStateTreeRequestSchema
} from '../../types/state';
import { BadRequestError } from '../../lib/error';
import { ILogger } from '../../types/logger';

export default class ValidateService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async getCountyTreeByCallingMs(ctx: Context, params: treeParams): Promise<IStateTreeRespose> {
    const { error } = getStateTreeRequestSchema.validate(params);

    if (error) {
      this.logger.warn(JSON.stringify(error));
      throw new BadRequestError('validation error', error);
    }
    return await this.service.getCountyTreeByCallingMs(ctx, params);
  }

  async getStateTree(ctx: Context, params: treeParams): Promise<IStateTreeRespose> {
    const { error } = getStateTreeRequestSchema.validate(params);

    if (error) {
      this.logger.warn(JSON.stringify(error));
      throw new BadRequestError('validation error', error);
    }
    return await this.service.getStateTree(ctx, params);
  }
}
