import { Request, Response } from "express";
import { Models } from "@libs/model";

export type RawContext = {
  res: Response;
  req: Request;
};

export type Context = RawContext & { user?: Models.User };
