import * as joi from "types-joi";
import Context from "../lib/context";
import { InterfaceFrom } from "types-joi";

export interface ICityTreeRespose {
  cityName: string;
}

export interface IService {
  getCityTree(ctx: Context, params: IGetCityTreeRequest): Promise<ICityTreeRespose[]>
}

export interface IRepository {
  getCityTree(ctx: Context, countyId: number): Promise<ICityTreeRespose[]>
}

const getCityTreeRequest = {
  countyId: joi.number().required(),
};

export const getCityTreeRequestSchema = joi.object({ ...getCityTreeRequest }).required();
export const getCityTreeRequestSchemaKeys = Object.keys(getCityTreeRequest);
export type IGetCityTreeRequest = InterfaceFrom<typeof getCityTreeRequestSchema>;

