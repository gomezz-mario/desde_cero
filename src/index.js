import express from "express";
import session from 'express-session';
import passport from "passport";
import initializePassport from "./modules/passport/passport.js"
import { productsRouter, cartsRouter, usersRouter } from "./routes/index.js";
import MongoStore from 'connect-mongo';
import { port, secretSessionKey, dbName, mongoUrl } from "./config.js";
import { addLogger, logger } from "./utils/logger.js";
import {swaggerServe, swaggerUiExpressSpecs} from "./config/swagger.config.js";

const app = express();



app.use('/apidocs', swaggerServe, swaggerUiExpressSpecs);
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

app.use(addLogger);
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/loggerTest', (req, res) => {
	req.logger.fatal("Fatal mensaje");
	req.logger.error("Error mensaje");
	req.logger.warn("Warning mensaje");
	req.logger.info("Info mensaje");
	req.logger.http("Http mensaje");
	req.logger.debug("Debug mensaje");
	res.send("OK")
});

app.listen(port, logger.info(`Server listening in port ${port}`));