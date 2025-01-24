

export const typeDefs = `#graphql
    type User{
        id: Int!
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
        user: User
        board: Board
    }

`