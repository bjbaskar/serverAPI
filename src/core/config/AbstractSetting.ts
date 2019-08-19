import { injectable, inject } from "inversify";
@injectable()
export abstract class AbstractSetting {
	public abstract get config(): IConfig;
}

export interface IConfig {
	flickerURL: string;
	server: IServerConfig;
	log: ILoggerConfig;
	database: undefined;
}

interface IServerConfig {
	port: string;
	max_login_attempts: number;
	lock_time: number;
	jwt_secret: string;
	token_expires_in: number;
}

interface ILoggerConfig {
	filename: string;
	filedir: string;
}