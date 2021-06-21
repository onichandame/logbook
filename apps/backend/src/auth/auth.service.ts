import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import {
  isEmail,
  validate,
  IsOptional,
  IsString,
  IsNumber
} from "class-validator";
import { sign, verify } from "jsonwebtoken";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Models } from "@libs/model";

const algorithm = `ES256`;
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3i9YoKBrfVUO5
MxcBoMe9/YMlmalYyxjYWHRm0fZBya3f3UxIRtTNMOah2TmqmzG0sXvZj8e62rYx
BKxtP9+Lm/TsSzqRAv4619MUJeBHXLMF8ntir51DF7hC3JA8BLGEs7eVc+LBvvhr
OZX0zqGccGbpQ/y6HH1vOnASXQJzS8UJ3hiUinyNc5yIbCkIV237hTWzY5l0MUzn
lzHOoE2I9C128RHI8IERmcw+9tkIyQKHrPHlZwnDrzrMaupbttSUKYqAu6KnxAAb
+Yfu713JEHJ6dhKDcpCf/IgU0fzaalxQ3Fd0uHvJ5mFxMgnN/jQquDs1T29gHzTm
B287DRLTAgMBAAECggEBAIJxbxG67t4pyqekF4WgrlPoB3yBaEkijdWzh4ZLUagP
nPKsY7o6HKJ3TnFX4BPPl9PDDzHfbSLurOzJVYGPE2A0xivoiwbkCanoGKsJAAu3
ZcOkQOwxwqIcCWf7OMZuz3pv/tjIMy9eeU467se80j5L49eD6eiatsqFzYA/ea5V
xTDU99gg7sK2bqZbXl528nxXwFySmlbikJu77r8R7PViv3IiA9Bg6T8qEW78YFDh
SwvfAa+/iNMhjXEi6XqHud0QaYphVlOCoIgQTRDH3oU5kSYDmnsUqcxtKc+RPKcS
AAp/xnsMdVOl43NsbdyCF1EC2zTrybYQ/g9rrBkf7wECgYEA8NlDkloC1pCw2O7y
+5r7Pk3jFKjY0XRksim6oWUTPymFYPVTyxAqx1jh4YQymGZy/8rUPZqeG/RXo5V3
lgCNxyhvPsGTa5MjLqFiRgcxoV9TmrlnYqO8EN4NiXmfRPmKwuMav99FpzSckwsK
AnosZ/++FHt7bBKDAG2GWTrv96kCgYEAwxe/gBawam4thL0I7+bHeHn0dg6/PqtN
wCBgPnpBn5z+eFGW/+pCBeEQ0sJt/CRkzrEByWe2D+q5HZNgO059c+9opi4UmaMi
KL8uZuxJeul5Lh2ibWWQ1TtBczxV6nzNcbK0ODHhuTuGiQyhu9Lleb+4NyDbq+Da
zBS5ZMU21BsCgYBddnJaYMOpMAzwogl4yfOlgeQVKFC7N0e8O6VI7EhDwoEX1xvl
OSjgowVE1mAr89W8naEvJskkX/WCbYYyl5RtLKu+1q+2lyqX9diFBFWmIa/34urT
xGY+xWzLZH8B7TSD3E2NF7+X2zrHdQk1XOPOl9fTavfCQIzFpbr09YIZwQKBgQCp
QDkKzqROMTecKMNQHU5/3o2Ovkx7+fGB9JSKn1W/O1wo1d/CNWEB6LfHoJX6YThz
eGysZiU0udXPKsQZr4Z2xgRr5x5IC5be8r023VcCIvrWXy9C6RI1ayrk5jtDKvKw
6PAgsGW7ZUDaNPM7F0Ot0/3lFcR94Jzw4CnWmqFucQKBgGdwSFUYpAzFoV7YxteG
q0ngb59bBGUXI00K7K9EIDQn3Tg501I0r6J6f3VbH7ceQg82vS78xD1aPa8F787b
k0HpSjCvaA6u/YEVw+McMl+VTXMKNWMZF1micV2f6gvI27hMOs/sf03LZxK/6iTF
DHx3Vq0wxRbWR0x7d5hRQ4Dk
-----END PRIVATE KEY-----`;
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt4vWKCga31VDuTMXAaDH
vf2DJZmpWMsY2Fh0ZtH2Qcmt391MSEbUzTDmodk5qpsxtLF72Y/Hutq2MQSsbT/f
i5v07Es6kQL+OtfTFCXgR1yzBfJ7Yq+dQxe4QtyQPASxhLO3lXPiwb74azmV9M6h
nHBm6UP8uhx9bzpwEl0Cc0vFCd4YlIp8jXOciGwpCFdt+4U1s2OZdDFM55cxzqBN
iPQtdvERyPCBEZnMPvbZCMkCh6zx5WcJw686zGrqW7bUlCmKgLuip8QAG/mH7u9d
yRByenYSg3KQn/yIFNH82mpcUNxXdLh7yeZhcTIJzf40Krg7NU9vYB805gdvOw0S
0wIDAQAB
-----END PUBLIC KEY-----`;

class Session {
  @IsNumber()
  uid!: number;
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  email?: string;
}

@Injectable()
export class AuthService {
  constructor(@InjectEntityManager() private em: EntityManager) {}

  parseHeader(raw?: string) {
    const arr = raw?.split(`Bearer `);
    if (arr?.length === 2) return { session: arr[1] };
  }

  async validateUserLocal(nameOrEmail: string, password: string) {
    const filter = isEmail(nameOrEmail)
      ? { email: nameOrEmail }
      : { name: nameOrEmail };
    const user = await this.em
      .findOneOrFail(Models.User, { where: filter })
      .catch(() => {
        throw new Error(`user not found`);
      });
    const creds = await this.em.find(Models.LocalCredential, {
      where: { user: user.id }
    });
    if (!creds.length) throw new Error(`password not set`);
    if (
      (await Promise.all(creds.map(cred => cred.validatePass(password)))).some(
        v => v
      )
    )
      return user;
    else throw new Error(`Password incorrect`);
  }

  async signSession(sess: Session) {
    return sign(sess, privateKey, { algorithm, expiresIn: `3y` });
  }

  async validateSession(session: string) {
    const sessObj = plainToClass(
      Session,
      verify(session, publicKey, { algorithms: [algorithm] })
    );
    await validate(sessObj);
    return sessObj;
  }

  async deserializeUser(id: number) {
    return this.em.findOneOrFail(Models.User, id);
  }
}
