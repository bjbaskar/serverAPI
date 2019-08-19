import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./InversifyTypes";
import { Server } from "../../server";
import { AbstractSetting } from "./AbstractSetting";
import { Setting } from "./Setting";
import { AbstractLogger } from "../logger/AbstractLogger";
import { Logger } from "../logger/Logger";

import { PhotoService } from "../../modules/publicphotos/PhotoService";

const ContainerMain = new Container();
ContainerMain.bind<Server>(TYPES.Server).to(Server);
ContainerMain.bind<AbstractSetting>(TYPES.Setting).to(Setting);
ContainerMain.bind<AbstractLogger>(TYPES.Logger).to(Logger);
ContainerMain.bind<PhotoService>(TYPES.PhotoService).to(PhotoService);

export { ContainerMain };
