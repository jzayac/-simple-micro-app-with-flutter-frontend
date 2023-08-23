import { IRepository, IStateTreeRepository } from '../../types/state';
import Context from '../../lib/context';
import { BadRequestError, InternalError } from "../../lib/error";
import { ILogger } from '../../types/logger';
import { prisma } from '../../lib/database';

export class Repository implements IRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async getState(ctx: Context, stateName: string) {
    const data = await prisma.state.findFirstOrThrow({
      where: {
        stateName: stateName
      }
    });

    return data;
  }

  async getStateTree(ctx: Context, state: string) {
    const data = await prisma.state.findFirst({
      where: {
        stateName: state
      },
      select: {
        stateName: true,
        County: {
          select: {
            countyName: true,
            City: {
              select: {
                cityName: true
              }
            }
          }
        }
      }
    });

    if (data === null) {
      throw new BadRequestError('state not found');
    }

    return data;
  }
}
