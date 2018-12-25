exports.typeDefs = `

type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String!
    likes: Int
    username: String
    imageUrl: String
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
    bio: String
    profilePic: String
}

type Token {
    token: String!
}

type Query {
    getAllRecipes: [Recipe]
    getRecipe(_id: ID!): Recipe
    getUserRecipes(username: String!):[Recipe]
    searchRecipes(searchTerm: String):[Recipe]
    getCurrentUser: User
    getProfile(username: String!): User
}

type Mutation {
    addRecipe(name: String!, category: String!, description: String!, instructions: String!, username: String, imageUrl: String):Recipe
    likeRecipe(_id: ID!, username: String!):Recipe
    unlikeRecipe(_id: ID!, username: String!):Recipe
    deleteUserRecipe(_id: ID!):Recipe

    signupUser(username: String!, password: String!, email: String!, confirmPassword: String!):Token
    signinUser(username: String!, password: String!):Token
    editProfile(username: String! bio: String, profilePic: String): User
}



`;