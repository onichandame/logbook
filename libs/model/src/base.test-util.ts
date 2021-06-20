import { EntityManager } from "typeorm";
import { TypeOrmModule, getEntityManagerToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { ConnectionModule } from "./connection";

export class TestModule {
  public module?: TestingModule;
  private _em?: EntityManager;

  static async createBare(args: { imports?: any[]; providers?: any[] }) {
    const instance = new this();
    instance.module = await Test.createTestingModule({
      imports: [ConnectionModule, ...(args.imports || [])],
      providers: [...(args.providers || [])]
    }).compile();
    await instance.module?.init();
    return instance;
  }
  static async create(args: {
    entities: Parameters<typeof TypeOrmModule["forFeature"]>[0];
  }) {
    const instance = await this.createBare({
      imports: [TypeOrmModule.forFeature(args.entities)]
    });
    instance._em = instance.module?.get<EntityManager>(getEntityManagerToken());
    return instance;
  }

  static async close(mod?: TestModule) {
    return mod?.module?.close();
  }

  public get em() {
    if (this._em) return this._em;
    else throw new Error(`${this.constructor.name} not initiated!`);
  }
}

export const createRandomStr = () => Math.random().toString(36).substr(2, 6);
