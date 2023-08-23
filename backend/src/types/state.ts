import * as joi from "types-joi";
import Context from "../lib/context";
import { InterfaceFrom } from "types-joi";
import type { State } from '@prisma/client';

export interface IStateTreeRepository {
  stateName: string;
  County: {
    countyName: string;
    City: {
      cityName: string;
    }[]
  }[]
}

export interface ICountyCityTree {
  [key: string]: string[]
}

export interface IStateTreeRespose {
  [key: string]: ICountyCityTree[]
}

export interface IService {
  getStateTree(ctx: Context, params: IGetStateTreeRequest): Promise<IStateTreeRespose>
  getCountyTreeByCallingMs(ctx: Context, params: IGetStateTreeRequest): Promise<IStateTreeRespose>
}

export interface IRepository {
  getStateTree(ctx: Context, stateName: string): Promise<IStateTreeRepository>
  getState(ctx: Context, stateName: string): Promise<State>
}

const getStateTreeRequest = {
  stateName: joi.string().required()
};

export const getStateTreeRequestSchema = joi.object({ ...getStateTreeRequest }).required();
export const getStateTreeRequestSchemaKeys = Object.keys(getStateTreeRequest);
export type IGetStateTreeRequest = InterfaceFrom<typeof getStateTreeRequestSchema>;

