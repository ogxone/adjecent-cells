import createError from "http-errors";
import express from "express";
import bodyParser from "body-parser"
import path, { resolve } from "path";
import morgan from "morgan";

import { ApiController } from "@controller/api.controller";
import { IndexController } from "@controller/index.controller";
import { useExpressServer } from "routing-controllers";
import { URL } from 'url';


var app = express();

useExpressServer(app, {
  controllers: [ApiController, IndexController],
  defaultErrorHandler: false,
});

let projectRoot = new URL('..', import.meta.url).pathname 
// view engine setup
app.set("views", path.join(projectRoot, "views"));
app.set("view engine", "jade");

app.use(morgan("dev"));
// app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(projectRoot, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export { app };
