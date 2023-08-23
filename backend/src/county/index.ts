import Service from './service/county.service';
import ValidateMiddleware from './service/county.validate';
import LoggerMiddleware from './service/county.logger';
import ErrorMiddleware from './service/county.error';
import { IRepository, IService } from '../types/county';
import { IService as ICityService } from '../types/city';
import { ILogger } from '../types/logger';
import { Repository } from './repository/repository';
import { LoggerAdapter } from '../lib/logger';

export default class CountyService {
  private logger: ILogger;
  private broker: { city: ICityService };
  private service: IService | null = null;

  constructor(logger: ILogger, broker: { city: ICityService }) {
    this.logger = new LoggerAdapter(logger, 'county service');
    this.broker = broker;
  }

  _createService(): IService {
    if (this.service) {
      return this.service;
    }
    const repository: IRepository = new Repository(this.logger);
    let service: IService = new Service(this.logger, this.broker, repository);

    service = new ValidateMiddleware(this.logger, service);
    service = new LoggerMiddleware(this.logger, service);
    service = new ErrorMiddleware(this.logger, service);

    this.service = service;
    return this.service;
  }

  getService(): IService {
    return this._createService();
  }
}
