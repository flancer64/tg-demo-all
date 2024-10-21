/**
 * Handles the 'start' command.
 */
export default class Demo_Back_Bot_Cmd_Start {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {typeof Demo_Back_Enum_Bot_Conversation} CONV
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Demo_Back_Enum_Bot_Conversation$: CONV,
        }
    ) {
        return async (ctx) => {
            try {
                await ctx.conversation.enter(CONV.START);
            } catch (e) {
                await ctx.reply(`An error occurred while processing your request: ${e.message}`);
                logger.exception(e);
            }
        };
    }
}
