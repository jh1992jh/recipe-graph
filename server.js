const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require ('dotenv').config({ path: 'variables.env'})


const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require('graphql-tools')

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
 


mongoose
.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to the DB'))
    .catch((err) => console.log(error));

const app = express();

app.use(cors('*'));

//app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use('/recipe', express.static(__dirname + '/public'));


app.use(async (req, res, next) => {
    const token = req.headers['authorization']
    if (token !== "null") {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET)
            req.currentUser = currentUser;
        } catch (err) {
            console.error(err)
        }
    }
    next()
});

app.use('/graphql', 
bodyParser.json(),
graphqlExpress(({ currentUser}) => ({
    schema,
    context: {
        Recipe,
        User,
        currentUser
    }
}))
)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
    })
}

const PORT = process.env.PORT || 4444;
    
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))