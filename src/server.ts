import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import cors from "cors";
import { createServer } from "http";
import { injectable, inject } from "inversify";

import { AbstractSetting } from "./core/config/AbstractSetting";
import { AbstractLogger } from "./core/logger/AbstractLogger";
import schema from "./resolvers";
import { IAppContext } from "./context";
import { getContext } from "./context";

import { TYPES } from "./core/config/InversifyTypes";
import { GraphQLError } from "graphql";

@injectable()
export class Server {
	private app: express.Express;
	private apolloServer: ApolloServer;
	private port: number;

	constructor(
		@inject(TYPES.Logger) private logger: AbstractLogger,
		@inject(TYPES.Setting) private setting: AbstractSetting
	) { }

	public startServer() {
		try {
			this.logger.info("🚀 Starting API server...");
			this.port = parseInt(this.setting.config.server.port, 10) || 8080;
			this.app = express().use("*", cors());
			const context: IAppContext = getContext();
			this.initServer(context);
		} catch (error) {
			this.logger.error(`Failure to connect to HTTP Server: ${error}`);
		}
	}

	private async initServer(contextAPI: IAppContext) {
		this.apolloServer = new ApolloServer({
			schema,
			introspection: true,
			playground: true,
			context: async ({ req }) => {
				try {
					const userInfo = "Baskaran. B";

					if (!userInfo) {
						throw new AuthenticationError("You must be logged in!");
					}

					contextAPI.CurrentUser = userInfo;
					const contexts = Object.assign({}, contextAPI);
					return contexts;
				} catch (error) {
					throw new AuthenticationError(`You must be logged in! ${error}`);
				}
			},
			formatError: error => {
				this.logger.error(`Error: ${error.message} - Trace: ${error}`);
				return new GraphQLError(error.message);
			}
		});
		this.apolloServer.applyMiddleware({ app: this.app });

		const httpServer = createServer(this.app);
		this.apolloServer.installSubscriptionHandlers(httpServer);

		httpServer.listen({ port: this.port }, () => {
			this.logger.info(
				`🔥 Server is ready at http://localhost:${this.port}${
				this.apolloServer.graphqlPath
				}`
			);
			this.logger.info(
				`🔥 Playground is ready at http://localhost:${this.port}${
				this.apolloServer.graphqlPath
				}`
			);
			this.logger.info(
				`🔥 Subscriptions is ready at ws://localhost:${this.port}${
				this.apolloServer.subscriptionsPath
				}`
			);
		});
	}
}
