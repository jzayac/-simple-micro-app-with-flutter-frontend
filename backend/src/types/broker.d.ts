import { ILogger } from './logger';
import { IService as IStateService } from "../types/state";
import { IService as ICountyService } from "../types/county";
import { IService as ICityService } from "../types/city";

interface IBroker {
  logger: ILogger;
  state: IStateService;
  county: ICountyService;
  city: ICityService;
}
