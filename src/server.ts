import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Making a middleware.

/**
 *
 * Note that any middleware that is created globally is available to the
 * routes that have been created. For instance in the middleware created below, the
 * request was augmented by adding a `shh_secret` thus we can access that property in any of the
 * routes requests object as soon as the middleware is registered and we hit that endpoint.
 */

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({
    message: "hello",
  });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type == "auth") {
    res.status(401).json({
      message: "Unauthorized",
    });
    if (err.type === "input") {
      res.status(400).json({
        message: "Invalid input",
      });
    } else {
      res.status(500).json({
        message: "Oops! that one's on us",
      });
    }
  }
  console.log(err);
  res.json({
    message: "Oops! there was an error",
  });
});
export default app;
