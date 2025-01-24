import { buildSchema } from "graphql";


export const graphqlSchema = buildSchema(`
    type Login{
        id: Int!
        username: String!
        email: String!
    }

    type User{
        username: String!
        email: String!
    }

    type Board{
        id: Int!
        title: String!
        permissions: String!
        content: String!
        created_at: String
    }

    type Query{
        login(email:String!, password:String!): Login
        createUser(username: String!, email: String!, password: String!): User
        board: Board
    }
`)