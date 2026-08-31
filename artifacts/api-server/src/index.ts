import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];
const port = Number(rawPort) || 3000;

// In Vercel serverless / AWS Lambda, do not block or throw on listen
if (process.env.VERCEL !== "1" && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(port, () => {
    logger.info({ port }, `Server listening on port ${port}`);
  });
}

export default app;
