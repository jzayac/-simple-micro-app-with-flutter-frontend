import express from 'express';
import { Request, Response } from 'express';
import Service from './service/state.service';
import Context from '../lib/context';
import ValidateMiddleware from './service/state.validate';
import LoggerMiddleware from './service/state.logger';
import ErrorMiddleware from './service/state.error';
import { IRepository, IGetStateTreeRequest, IService } from '../types/state';
import { ILogger } from '../types/logger';
import { Repository } from './repository/repository';
import { LoggerAdapter } from '../lib/logger';
import { IService as ICountyService } from '../types/county';

export default class StateService {
  private logger: ILogger;
  private broker: { county: ICountyService };
  private service: IService | null = null;

  constructor(logger: ILogger, broker: any) {
    this.logger = new LoggerAdapter(logger, 'state service');
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

    // TESTING service communication
    // service.getCountyTreeByCallingMs(new Context(), {stateName: 'California'}).then((data) => {
    //   // console.log(JSON.stringify(data, null, 2));
    //   console.log('state service is ready');
    // });

    return this.service;
  }

  getService(): IService {
    return this._createService();
  }

  createRouter(): express.Router {
    const router = express.Router();
    const service = this._createService();

    router.get('/state/:stateName', async (req: Request, res: Response) => {
      const params = req.params as IGetStateTreeRequest;
      const ctx: Context = Context.createFromRequest(req);

      try {
        const data = await service.getStateTree(ctx, params);

        res.status(200).json(data);
      } catch (err: any) {
        res.status(err.code).json({
          error: err.message
        });
      }
    });

    return router;
  }
}
