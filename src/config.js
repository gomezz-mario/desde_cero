import dotenv from "dotenv";
dotenv.config();

export const persistence = process.env.PERSISTENCE;
export const port = process.env.PORT;
export const mongoUrl = process.env.MONGO_URL;
export const dbName = process.env.DB_NAME;
export const secretSessionKey = process.env.SECRET_SESSION_KEY;
export const mailPass = process.env.EMAIL_PASS;
export const mailUser = process.env.EMAIL_USER;
export const proyectStage = process.env.PROYECT_STAGE;


