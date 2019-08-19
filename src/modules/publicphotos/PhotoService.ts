import { injectable, inject } from "inversify";
import { IPhotos } from "./IPhoto";
import { BadMapping } from "../../core/exceptions";
import _ from "lodash";
import request from "request";

import { AbstractSetting } from "../../core/config/AbstractSetting";
import { AbstractLogger } from "../../core/logger/AbstractLogger";
import { TYPES } from "../../core/config/InversifyTypes";

@injectable()
export class PhotoService {
	constructor(@inject(TYPES.Logger) private logger: AbstractLogger,
		@inject(TYPES.Setting) private setting: AbstractSetting) { }

	public async getAllPhotos(inputTag: string): Promise<any> {
		try {
			return new Promise((resolve, reject) => {
				let allData: IPhotos[] = [];
				const tagValue = inputTag ? inputTag.trim() : "";

				const url = this.setting.config.flickerURL + tagValue;
				request(url, { json: true }, async (err, res, data) => {
					if (err) {
						return reject(err);
					}

					const jsonpData = data;
					let json;

					try {
						json = JSON.parse(jsonpData);
					}
					catch (e) {
						const startPos = jsonpData.indexOf("({");
						const endPos = jsonpData.indexOf("})");
						const jsonString = jsonpData.substring(startPos + 1, endPos + 1);
						json = JSON.parse(jsonString);
					}

					allData = await [json];
					return resolve(allData);
				});
			});
		} catch (error) {
			throw new BadMapping("Unhandled Error", error);
		}
	}
}
