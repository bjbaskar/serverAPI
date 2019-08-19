import "reflect-metadata";
import { ContainerMain } from "./core/config/InversifyConfig";
import { TYPES } from "./core/config/InversifyTypes";
import { PhotoService } from "./modules/publicphotos/PhotoService";

import { Setting } from "./core/config/Setting";

export function getContext(): IAppContext {
	return {
		Setting: ContainerMain.get<Setting>(TYPES.Setting),
		CurrentUser: undefined,
		PhotoService: ContainerMain.get<PhotoService>(TYPES.PhotoService),
	};
}

export interface IAppContext {
	Setting: Setting;
	CurrentUser: String;
	PhotoService: PhotoService;
}
