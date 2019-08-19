import { IAppContext } from "../../../context";
import { IPhotos } from "../IPhoto";

export const resolvers = {
	Query: {
		getAllPhotos: async (_: any, args: { inputTag: string }, context: IAppContext) => {
			const res = await context.PhotoService.getAllPhotos(args.inputTag);
			console.log(res);
			return res;
		}
	},
};
