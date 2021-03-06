import {
  blue,
  yellow,
  red,
  bold,
  logger,
  ConsoleHandler,
  LogRecord,
  LevelName,
} from "../deps.ts";

const LEVEL_PREFIX: { [key: number]: string } = {
  [logger.LogLevels.INFO]: blue("info"),
  [logger.LogLevels.WARNING]: yellow("warn"),
  [logger.LogLevels.ERROR]: red("error"),
  [logger.LogLevels.CRITICAL]: bold(red("critical")),
};

await logger.setup({
  handlers: {
    console: new class extends ConsoleHandler {
      format(logRecord: LogRecord) {
        const prefix = LEVEL_PREFIX[logRecord.level];
        return `${prefix ? `${prefix}: ` : ""}${logRecord.msg}`;
      }
    }("DEBUG"),
  },
  loggers: {
    default: {
      level: Deno.env.get("VR_LOG") as LevelName || "WARNING",
      handlers: ["console"],
    },
  },
});

export const log = logger.getLogger();
