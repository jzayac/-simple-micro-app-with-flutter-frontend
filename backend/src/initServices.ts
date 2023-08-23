import StateService from "./state";
import CountyService from "./county";
import CityService from "./city";
import { ILogger } from './types/logger';
import { IBroker } from './types/broker';



export default (logger: ILogger) =>  {
  // @ts-ignore
  const broker: IBroker = {};

  const stateService = new StateService(logger, broker);
  const stateRouter = stateService.createRouter();
  broker.state = stateService.getService();

  const countyService = new CountyService(logger, broker);
  broker.county = countyService.getService();

  const cityService = new CityService(logger, broker);
  broker.city = cityService.getService();

  return {
    state: stateRouter,
  };
};
