const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql').graphqlHTTP;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const cors = require('cors');
const userData = require("./Mockdata.json");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLInt },
        Name: { type: GraphQLString },
        email: { type: GraphQLString },
        designation: { type: GraphQLString },
        experience: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return userData;
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                Name: { type: GraphQLString },
                email: { type: GraphQLString },
                designation: { type: GraphQLString },
                experience: { type: GraphQLString },
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length + 1,
                    Name: args.Name,
                    email: args.email,
                    designation: args.designation,
                    experience: args.experience,
                });
                return args;
            },
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: GraphQLInt },
            },
            resolve(parent, args) {
                userData.splice(args.id, 1);
                return args;
            },
        },
    },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
app.use(cors())
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))