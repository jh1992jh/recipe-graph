const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateSignup = require('./validation/signup-validation');
const validateRecipe = require('./validation/recipe-validation');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({username, email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: async(root, args, { Recipe }) => {
            const recipes = await Recipe.find().sort({ createdDate: 'desc'})

            return recipes;
        },
        getRecipe: async(root, { _id }, { Recipe }) => {
            const recipe = await Recipe.findById({ _id});
            return recipe;
        },
        getUserRecipes: async(root, { username }, {Recipe }) => {
            const recipes = await Recipe.find({ username });
            return recipes;
        },
        getCurrentUser: async(root, args, { currentUser, User }) => {
            if(!currentUser) return null;

            const user = await User.findOne({ username: currentUser.username})
                .populate({
                    path: 'favorites',
                    model: 'Recipe'
                })
            return user;
        }, 
        getProfile: async(root, { username }, { User }) => {
            const user = await User.findOne({username})
                .populate({
                    path: 'favorites',
                    model: 'Recipe'
                })

            if(!user) throw new Error('There is no Profile with that username')
            return user;
        },
        searchRecipes: async(root, { searchTerm }, { Recipe }) => {
            if(searchTerm) {
                const searchResults = await Recipe.find({
                    $text: { $search: searchTerm}
                },
                {
                    score: { $meta: "textScore" }
                }).sort({
                    score: { $meta: "textScore"}
                });

                return searchResults
            } else {
                const recipes = await Recipe.find().sort({ likes: 'desc', createdDate: 'desc'})
                return recipes;
            }
        }
    },
    Mutation: {
        addRecipe: async (root, { name, category, description, instructions, username, imageUrl}, { Recipe }) => {

            const { errors, isValid } = validateRecipe([name, description, instructions]);

            if(!isValid) {
                
                throw new Error(JSON.stringify(errors))
            }

            if(imageUrl.length === 0) imageUrl = '/default-pic.svg'
            const newRecipe = await new Recipe({
                
                name, 
                category,
                description,
                instructions,
                username,
                imageUrl
            }).save();
            return newRecipe;
        },
        likeRecipe: async(root, { _id, username }, { Recipe, User}) => {
            const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1}});
            const user = await User.findOneAndUpdate({ username }, { $addToSet: {favorites: _id}})
            return recipe
        },
        unlikeRecipe: async(root, { _id, username }, { Recipe, User }) => {
            const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1}})
            const user = await User.findOneAndUpdate({username}, { $pull: {favorites: _id}})
            return recipe
        },
        deleteUserRecipe: async(root, { _id }, { Recipe }) => {
            const recipe = await Recipe.findOneAndRemove({ _id });
            return recipe;
        },
        signupUser: async(root, { username, password, email, confirmPassword}, { User }) => {
            const user = await User.findOne({username});
            const { errors, isValid } = validateSignup([username, password, email, confirmPassword]);

           
           if(!isValid) {
               throw new Error(JSON.stringify(errors));
           }
            if(user) {
                throw new Error('User Already Exists')
            }

            const newUser = await new User({
                username,
                email,
                password
            }).save()

            return { token: createToken(newUser, process.env.SECRET, '1hr')}
        },
        signinUser: async(root, {username, password}, { User }) => {
            const user = await User.findOne({username});

            if(!user) {
                throw new Error('User does not exist')
            }

            const isValidPassword = await bcrypt.compare(password, user.password)

            if(!isValidPassword) {
                throw new Error('Invalid Credentials')
            }

            return { token: createToken(user, process.env.SECRET, '1hr')}
        },
        editProfile: async(root, {username, bio, profilePic}, { User }) => {
            const user =  await User.findOneAndUpdate({username}, { $set: {bio: bio, profilePic: profilePic}})
            return user;
        },
    }
}