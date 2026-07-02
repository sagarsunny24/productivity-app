import { allowedOrigins } from "./allowedOrigins.js";
import type { CorsOptions } from "cors";

export const corsOptions:CorsOptions = {
  origin: (origin,callback) => {
    if(allowedOrigins.includes(origin as string)|| !origin) {
      callback(null,true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}