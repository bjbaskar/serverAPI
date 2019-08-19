import { makeExecutableSchema } from "apollo-server";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { GraphQLUpload } from "graphql-upload";

import { merge } from "lodash";

import DateTimeType from "./common/GraphqlDate";

import { typeDef, resolvers } from "./modules/publicphotos/schema";

const BaseQuery = `
	scalar DateTimeType
	type Query {
	_: Boolean
	}
	type Mutation {
	_: Boolean
	}
`;

const allTypeDefs = [
	BaseQuery,
	typeDef
];
const allResolvers = merge(
	{},
	resolvers
);

export default makeExecutableSchema({
	typeDefs: allTypeDefs,
	resolvers: allResolvers
});
