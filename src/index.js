import express from "express";
import session from 'express-session';
import passport from "passport";
import initializePassport from "./moduls/passport/passport.js"
import { productsRouter, cartsRouter, usersRouter } from "./routes/index.js";
import MongoStore from 'connect-mongo';
import { port, secretSessionKey, dbName, mongoUrl } from "./config.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
	store: MongoStore.create({
		mongoUrl,
		dbName,
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true	
		},
		ttl: 3000
	}),
	secret: secretSessionKey,
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
initializePassport();

app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());

app.listen(port, console.log("Listening ..."));