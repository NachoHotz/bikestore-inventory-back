import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import errorMiddleware from './middlewares/error.middleware';
import mainRouter from './routes/index.routes';
import { corsOptions, envConfig } from './config/';

const app: Application = express();

const { NODE_ENV, SENTRY_DSN } = envConfig;

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(express.json({ limit: '25mb' }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

if (NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use('/', mainRouter);
app.use(Sentry.Handlers.errorHandler());
app.use(errorMiddleware);

export default app;
