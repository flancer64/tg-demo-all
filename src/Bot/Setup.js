/**
 * Sets up command registration and conversation handling for the Telegram bot.
 */
// IMPORTS
import {session} from 'grammy';
import {conversations, createConversation} from '@grammyjs/conversations';

// CLASSES
/**
 * @implements {Telegram_Bot_Back_Api_Setup}
 */
export default class Demo_Back_Bot_Setup {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Telegram_Bot_Back_Mod_Mdlwr_Log} mwFactLog
     * @param {Demo_Back_Bot_Cmd_Help} cmdHelp
     * @param {Demo_Back_Bot_Cmd_Settings} cmdSettings
     * @param {Demo_Back_Bot_Cmd_Start} cmdStart
     * @param {Demo_Back_Bot_Filter_Message} filterMessage
     * @param {Demo_Back_Bot_Conv_Start} convStart
     * @param {typeof Demo_Back_Enum_Bot_Command} CMD
     * @param {typeof Demo_Back_Enum_Bot_Conversation} CONV
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Telegram_Bot_Back_Mod_Mdlwr_Log$: mwFactLog,
            Demo_Back_Bot_Cmd_Help$: cmdHelp,
            Demo_Back_Bot_Cmd_Settings$: cmdSettings,
            Demo_Back_Bot_Cmd_Start$: cmdStart,
            Demo_Back_Bot_Filter_Message$: filterMessage,
            Demo_Back_Bot_Conv_Start$: convStart,
            Demo_Back_Enum_Bot_Command$: CMD,
            Demo_Back_Enum_Bot_Conversation$: CONV,
        }
    ) {
        // INSTANCE METHODS
        this.commands = async function (bot) {
            await bot.api.setMyCommands([
                {command: CMD.HELP, description: 'Get help.'},
                {command: CMD.SETTINGS, description: 'Configure bot settings.'},
                {command: CMD.START, description: 'Start using the bot.'},
            ]);
            logger.info(`A total of ${Object.keys(CMD).length} commands have been set for the bot.`);
        };

        this.handlers = async function (bot) {
            // Command handlers
            bot.command(CMD.HELP, cmdHelp);
            bot.command(CMD.SETTINGS, cmdSettings);
            bot.command(CMD.START, cmdStart);

            // other filters
            bot.on('message', filterMessage);
        };

        this.middleware = async function (bot) {
            // Uses the factory to create middleware for logging user messages and intercepting middleware exceptions.
            bot.use(mwFactLog.create());

            // Middleware for conversations
            bot.use(session({initial: () => ({})}));
            bot.use(conversations());

            // This middleware should be placed after `bot.use(conversations())`
            bot.use(async (ctx, next) => {
                if (ctx?.chat && (typeof ctx?.conversation?.active === 'function')) {
                    const {start} = await ctx.conversation.active();
                    if (start >= 1) {
                        logger.info(`An active conversation exists.`);
                        const commandEntity = ctx.message?.entities?.find(entity => entity.type === 'bot_command');
                        if (commandEntity) {
                            await ctx.conversation.exit(CONV.START);
                            await ctx.reply(`The previous conversation has been closed.`);
                        }
                    }
                }
                await next();
            });

            // Set up conversations
            bot.use(createConversation(convStart, CONV.START));
        };
    }
}