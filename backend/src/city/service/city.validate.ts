import Context from '../../lib/context';

import {
  IService,
  ICityTreeRespose,
  IGetCityTreeRequest as treeParams,
  getCityTreeRequestSchema
} from '../../types/city';
import { BadRequestError } from '../../lib/error';
import { ILogger } from '../../types/logger';

export default class ValidateService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async getCityTree(ctx: Context, params: treeParams) {
    const { error } = getCityTreeRequestSchema.validate(params);

    if (error) {
      this.logger.warn(JSON.stringify(error));
      throw new BadRequestError('validation error', error);
    }
    return await this.service.getCityTree(ctx, params);
  }
}
