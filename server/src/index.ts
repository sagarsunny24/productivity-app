import express from "express";
import cors from "cors";
import logger from "../middleware/logger.js";
import register from "../routes/register.js";
import auth from "../routes/auth.js";
import { expressMiddleware } from '@as-integrations/express5'
import refresh from '../routes/refresh.js'
import errorHandler from "../middleware/errorHandler.js";
import notFound from "../middleware/notFoundHandler.js";
import { corsOptions } from "../config/corsOptions.js";
import verifyJWT  from "../middleware/verifyJWT.js";
import server from "./apollo.js";
import cookieParser from 'cookie-parser'
// import userExists from './middleware/userExists.js'
import pool from "../config/database.js";
import {
  initializeDatabaseTasks,
  initializeDatabaseUser,
} from "../config/database.js";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";
import { GraphQLError } from "graphql";
const app = express();

app.use(cors(corsOptions));
//middleware for allowing all origins
//middleware for reading JSON data
app.use(express.json());

//middleware for console req coloring
app.use(logger);
//Testing POSTGRESS CONNECTION


//middleware for cookies
app.use(cookieParser())
app.get("/test", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is: ${result.rows[0].current_database}`);
});
async function startServer() {
  await initializeDatabaseUser();
  await initializeDatabaseTasks();
  app.use("/register", register);
  app.use("/auth", auth);
  app.use("/refresh",refresh)
 // need to add verifyJWT middleware too
 app.use('/graphql',
          expressMiddleware(server,{
            context: async({req})=>{
              const authHeader = req.headers['authorization']
              if (!authHeader?.startsWith('Bearer ')){
                throw new GraphQLError('unauthorized',{
                  extensions:{code:'UNAUTHENTICATED'}
                  })
                }
                const token = authHeader.split(' ')[1]
               return {userId:verifyJWT(token!)}
              }
            
          }),
 )
  app.use(notFound);
  app.use(errorHandler);

  app.listen(3000, () => console.log("Server running on PORT 3000"));
}
startServer();
