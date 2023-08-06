var createError = require("http-errors");
var express = require("express");
const expressLayouts = require("express-ejs-layouts");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
var cors = require("cors");
const { isLogin, hasRoles } = require("./middleware/authMiddleware");
const config = require("./config");

var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const dashboardRouter = require("./routes/dashboard");
const categoriesRouter = require("./routes/categories");
const tagsRouter = require("./routes/tags");
const postsRouter = require("./routes/posts");
const structuralsRouter = require("./routes/structurals");
const memberPositionsRouter = require("./routes/member-positions");
const periodeRouter = require("./routes/periode");
const membersRouter = require("./routes/members");
const quotesRouter = require("./routes/quotes");
const achievementsRouter = require("./routes/achievements");
const settingsRouter = require("./routes/settings");

// api route
const achievementsApiRouter = require("./routes/api/achievements");
const categoriesApiRouter = require("./routes/api/categories");
const membersApiRouter = require("./routes/api/members");
const periodeApiRouter = require("./routes/api/periode");
const postsApiRouter = require("./routes/api/posts");
const quotesApiRouter = require("./routes/api/quotes");
const settingsApiRouter = require("./routes/api/settings");
const structuralsApiRouter = require("./routes/api/structurals");
const tagsApiRouter = require("./routes/api/tags");

var app = express();
const URL = `/api/v1`;
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(function (req, res, next) {
  res.locals.storageUrl = config.storageUrl;
  res.locals.user = req.session.user;
  next();
});

app.use(flash());
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/app");
app.set("view engine", "ejs");

app.use("/", loginRouter);
app.use(
  "/dashboard",
  isLogin,
  hasRoles(["ketum", "sekum", "medinfo", "akademis"]),
  dashboardRouter
);
app.use(
  "/categories",
  isLogin,
  hasRoles(["ketum", "sekum", "medinfo", "akademis"]),
  categoriesRouter
);
app.use(
  "/tags",
  isLogin,
  hasRoles(["ketum", "sekum", "medinfo", "akademis"]),
  tagsRouter
);
app.use(
  "/posts",
  isLogin,
  hasRoles(["ketum", "sekum", "medinfo", "akademis"]),
  postsRouter
);
app.use(
  "/structurals",
  isLogin,
  hasRoles(["ketum", "sekum"]),
  structuralsRouter
);
app.use(
  "/member-positions",
  isLogin,
  hasRoles(["ketum", "sekum"]),
  memberPositionsRouter
);
app.use("/periode", isLogin, hasRoles(["ketum", "sekum"]), periodeRouter);
app.use("/members", isLogin, hasRoles(["ketum", "sekum"]), membersRouter);
app.use("/users", isLogin, hasRoles(["ketum"]), usersRouter);
app.use("/quotes", isLogin, hasRoles(["ketum"]), quotesRouter);
app.use(
  "/achievements",
  isLogin,
  hasRoles(["ketum", "sekum"]),
  achievementsRouter
);
app.use("/settings", isLogin, hasRoles(["ketum"]), settingsRouter);

// API
app.use(`${URL}/members`, membersApiRouter);
app.use(`${URL}/structurals`, structuralsApiRouter);
app.use(`${URL}/quotes`, quotesApiRouter);
app.use(`${URL}/posts`, postsApiRouter);
app.use(`${URL}/periode`, periodeApiRouter);
app.use(`${URL}/tags`, tagsApiRouter);
app.use(`${URL}/categories`, categoriesApiRouter);
app.use(`${URL}/achievements`, achievementsApiRouter);
app.use(`${URL}/settings`, settingsApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.render("404", { layout: false });
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

module.exports = app;
