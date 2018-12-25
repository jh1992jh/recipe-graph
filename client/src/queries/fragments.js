import { gql } from 'apollo-boost';

export const recipeFragments = {
    recipe: gql`
        fragment CompleteRecipe on Recipe {
            _id
            name
            category
            description
            instructions
            username
            likes
            imageUrl
        }
    `,
    like: gql`
    fragment LikeRecipe on Recipe {
        name
        likes
    }
    `
}