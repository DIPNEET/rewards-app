import pino from 'pino';

function send(level, logEvent) {
  // For this assignment we log to console,
  // but this could be sent to a remote service.
  // eslint-disable-next-line no-console
  console.log('pino-log', level, logEvent);
}

const logger = pino({
  browser: {
    serialize: true,
    asObject: true,
    transmit: {
      send
    }
  }
});

export default logger;
