import createError from "http-errors";
import express from "express";
import bodyParser from "body-parser"
import path, { resolve } from "path";
import morgan from "morgan";

import { ApiController } from "@controller/api.controller";
import { IndexController } from "@controller/index.controller";
import { BadRequestError, useExpressServer } from "routing-controllers";
import { URL } from 'url';
import { instanceToInstance, instanceToPlain } from "class-transformer";


var app = express();

useExpressServer(app, {
  controllers: [ApiController, IndexController],
  defaultErrorHandler: false,
});

let projectRoot = new URL('..', import.meta.url).pathname 
console.log(import.meta.url)
console.log(projectRoot)
// view engine setup
app.set("views", path.join(`${projectRoot}/../`, "views"));
app.set("view engine", "jade");
app.locals.pretty = true

app.use(morgan("dev"));

app.use(bodyParser.json());

console.log(`${projectRoot}../`, "public")
app.use(express.static(path.join(`${projectRoot}../`, "public")));

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

  if (req.path.indexOf('/api/') == 0) {
    res.write(JSON.stringify(err, Object.getOwnPropertyNames(err)));  
    res.send();
  } else {
    res.render("error");
  }
});

export { app };
