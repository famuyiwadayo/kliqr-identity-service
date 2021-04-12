import express, { Express } from "express";
import helmet from "helmet";
import Routes from "./routes";
import {
  catchRequest,
  compressor,
  handleError,
  logRequests,
} from "./middlewares";
import { config } from "./config/config";
import ServiceRegistry from "./services/registry.service";

const app: Express = express();
const serviceRegistry = new ServiceRegistry();

app.use(helmet());
app.use(compressor());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logRequests);

app.use("/v1", Routes);
app.get("/", (_, res) =>
  res
    .status(200)
    .json({ name: config.NAME, type: "microservice", version: config.VERSION })
);

// catch 404 and forward to error handler
app.use(catchRequest);
app.use(handleError);

app.listen(config.PORT, async () => {
  await serviceRegistry.register();
  const interval = setInterval(
    async () => await serviceRegistry.register(),
    20000
  );

  const cleanup = async () => {
    clearInterval(interval);
    await serviceRegistry.unregister();
  };

  process.on("uncaughtException", async () => {
    await cleanup();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await cleanup();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await cleanup();
    process.exit(0);
  });

  console.log(
    `🚀 ${config.NAME} microservice running on localhost:${config.PORT} ⚡`
  );
});
