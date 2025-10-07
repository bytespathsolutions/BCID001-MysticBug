import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { usersRouter } from "./routes/users.js";
import { dbConn } from "./config/dbconnection.js";

dotenv.config();

const app = express();
app.use(cors("http://localhost:5000"));
app.use(express.json());
//db call
dbConn();

// init firebase-admin using service account provided via env 
let serviceAccount;
// Parse JSON safely

serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin Initialized ✅");

app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
