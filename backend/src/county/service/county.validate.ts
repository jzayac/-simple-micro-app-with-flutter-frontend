import Context from '../../lib/context';

import {
  IService,
  IGetCountyTreeRequest as treeParams,
  getCountyTreeRequestSchema
} from '../../types/county';
import { BadRequestError } from '../../lib/error';
import { ILogger } from '../../types/logger';

export default class ValidateService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async getCountyTree(ctx: Context, params: treeParams) {
    const { error } = getCountyTreeRequestSchema.validate(params);

    if (error) {
      this.logger.warn(JSON.stringify(error));
      throw new BadRequestError('validation error', error);
    }
    return await this.service.getCountyTree(ctx, params);
  }
}
