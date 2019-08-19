import "reflect-metadata";
import { ContainerMain } from "./core/config/InversifyConfig";
import { Server } from "./server";
import { TYPES } from "./core/config/InversifyTypes";

const server: Server = ContainerMain.get<Server>(TYPES.Server);
server.startServer();
