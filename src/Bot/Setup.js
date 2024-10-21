/**
 * Display the messages about the processing of an API request.
 */
// IMPORTS

// CLASSES
/**
 * @implements {Telegram_Bot_Back_Api_Setup}
 */
export default class Demo_Back_Bot_Setup {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Demo_Back_Bot_Cmd_Help} cmdHelp
     * @param {Demo_Back_Bot_Cmd_Settings} cmdSettings
     * @param {Demo_Back_Bot_Cmd_Start} cmdStart
     * @param {Demo_Back_Bot_Filter_Message} filterMessage
     * @param {typeof Demo_Back_Enum_Bot_Command} CMD
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Demo_Back_Bot_Cmd_Help$: cmdHelp,
            Demo_Back_Bot_Cmd_Settings$: cmdSettings,
            Demo_Back_Bot_Cmd_Start$: cmdStart,
            Demo_Back_Bot_Filter_Message$: filterMessage,
            Demo_Back_Enum_Bot_Command$: CMD,
        }
    ) {
        // INSTANCE METHODS
        this.commands = async function (bot) {
            bot.api.setMyCommands([
                {command: CMD.HELP, description: 'Get help.'},
                {command: CMD.SETTINGS, description: 'Configure bot settings.'},
                {command: CMD.START, description: 'Start using the bot.'},
            ]);
            logger.info(`A total of ${Object.keys(CMD).length} commands have been set for the bot.`);
            return bot;
        };

        this.handlers = function (bot) {
            // middleware
            bot.use(async (ctx, next) => {
                const message = ctx.message;
                if (message) {
                    const user = message.from.username;
                    const userId = message.from.id;
                    const msgId = message.message_id;
                    const chatId = message.chat.id;
                    logger.info(`[${chatId}][${msgId}][${user}][${userId}] ${message?.text}`);
                }
                await next();
            });

            // command handlers
            bot.command(CMD.HELP, cmdHelp);
            bot.command(CMD.SETTINGS, cmdSettings);
            bot.command(CMD.START, cmdStart);

            // other filters
            bot.on('message', filterMessage);
            return bot;
        };
    }
}
