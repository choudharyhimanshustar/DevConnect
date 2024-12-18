// GraphQL schema definitions
const {gql}=require('apollo-server')
const typeDefs=gql`
type User{
    _id:ID!
    email:String!           
    password:String!
} 
type AuthPayload{
    token: String!
    user:User!
}
type Query{
    identity:User
}
type Mutation{
    signup(email:String!,password:String!):AuthPayload
    login(email:String!,password:String!):AuthPayload
}
`
module.exports={typeDefs};