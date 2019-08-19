import { injectable } from "inversify";
import * as path from "path";
import { AbstractSetting, IConfig } from "./AbstractSetting";
import * as dotenv from "dotenv";

@injectable()
export class Setting extends AbstractSetting {
	private readonly settings: IConfig;

	constructor() {
		super();

		dotenv.config();

		this.settings = {
			flickerURL: "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=bjbaskar&format=json&tags=",
			log: {
				filedir: path.join(__dirname, "../../../log"),
				filename: "project1-%DATE%.log"
			},
			server: {
				port: process.env.PORT,
				max_login_attempts: Number(process.env.MAX_LOGIN_ATTEMPTS),
				lock_time: Number(process.env.LOCK_TIME),
				jwt_secret: process.env.JWT_SECRET,
				token_expires_in: Number(process.env.TOKEN_EXPIRES_IN)
			},
			database: undefined
		};
	}

	public get config(): IConfig {
		return this.settings;
	}

}
