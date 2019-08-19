import * as fs from "fs";
import { injectable, inject } from "inversify";
import * as winston from "winston";
import DailyRotate from "winston-daily-rotate-file";
import { AbstractSetting } from "../config/AbstractSetting";
import { AbstractLogger } from "./AbstractLogger";
import { TYPES } from "../config/InversifyTypes";
const format = winston.format;

@injectable()
export class Logger extends AbstractLogger {
	private logger: winston.Logger;

	constructor(@inject(TYPES.Setting) private settings: AbstractSetting) {
		super();
		this.checkForLogFileDir();
		this.initializeLogger();
	}

	public log(level: string, message: string) {
		this.logger.log(level.toLowerCase(), message);
	}

	private checkForLogFileDir() {
		const dir = this.settings.config.log.filedir;

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
	}

	private initializeLogger() {
		this.logger = winston.createLogger({
			// level: "info",
			format: format.combine(
				format.colorize(),
				format.timestamp({
					format: "DD-MMM-YYYY HH:mm:ss"
				}),
				format.printf(
					info => `${info.timestamp} : ${info.level} : ${info.message}`
				)
			),
			transports: [
				new winston.transports.Console({
					// format: format.combine(format.colorize(), format.simple())
				}),
				new DailyRotate({
					filename: this.settings.config.log.filename,
					dirname: this.settings.config.log.filedir,
					maxSize: 20971520, // 20MB 5242880  5MB
					maxFiles: 25,
					datePattern: "DD-MMM-YYYY",
					zippedArchive: true
				})
			]
		});
	}
}
