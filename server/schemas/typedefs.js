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
type UserProfile{
    _id:ID!
    name:String!
    skills:[String]!
    linkedin:String
    github:String
    about:String
    dp:String!
}
type Query{
    identity:User
}
type Mutation{
    signup(email:String!,password:String!):AuthPayload
    login(email:String!,password:String!):String!
    verifyOTP(email:String!,otp:Int!):AuthPayload
    createUserProfile(name:String!,skills:[String]!,linkedin:String,github:String,about:String,dp:String!):UserProfile
}
`
module.exports={typeDefs};