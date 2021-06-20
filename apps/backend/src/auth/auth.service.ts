import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Models } from "@libs/model";

@Injectable()
export class AuthService {
  constructor(@InjectEntityManager() private em: EntityManager) {}

  parseHeader(raw: string) {
    const arr = raw.split(`Bearer `);
    if (arr.length === 2) return { sessionKey: arr[1] };
  }

  deserialize(sessionKey: string) {}
}
