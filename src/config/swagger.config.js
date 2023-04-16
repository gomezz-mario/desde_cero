import { __dirname } from "../utils/dirname.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const swaggerOptions = {
	definition: {
		openapi: '3.0.1',
		info: {
			title: "Documentación de API Ecommerce",
			description: "Se detalla toda la información de los endpoints de la API."
		}
	},
	apis: [`${__dirname}/../docs/**/*yaml`]
};
const specs = swaggerJSDoc(swaggerOptions);
export const swaggerServe = swaggerUiExpress.serve;
export const swaggerUiExpressSpecs = swaggerUiExpress.setup(specs);