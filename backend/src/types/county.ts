import * as joi from "types-joi";
import Context from "../lib/context";
import { InterfaceFrom } from "types-joi";

export interface ICountyTreeRepository {
  id: number;
  countyName: string;
}

export interface ICountyRepository {
  countyName: string;
  City: {
    cityName: string;
  }[]
}

export interface ICountyCityTree {
  [key: string]: string[]
}

export interface ICountyTreeRespose {
  // id: number;
  countyName: string;
  City: {
    cityName: string;
  }[]
}

export interface IService {
  getCountyTree(ctx: Context, params: IGetCountyTreeRequest): Promise<ICountyTreeRespose[]>
}

export interface IRepository {
  getCountyTree(ctx: Context, stateId: number): Promise<ICountyTreeRepository[]>
}

const getCountyTreeRequest = {
  stateId: joi.number().required(),
};

export const getCountyTreeRequestSchema = joi.object({ ...getCountyTreeRequest }).required();
export const getCountyTreeRequestSchemaKeys = Object.keys(getCountyTreeRequest);
export type IGetCountyTreeRequest = InterfaceFrom<typeof getCountyTreeRequestSchema>;

