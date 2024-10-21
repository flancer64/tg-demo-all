/**
 * The handler for the 'help' command.
 */
export default class Demo_Back_Bot_Cmd_Help {
    /**
     * @param {typeof Demo_Back_Enum_Bot_Command} CMD
     */
    constructor(
        {
            Demo_Back_Enum_Bot_Command$: CMD,
        }
    ) {
        return async (ctx) => {
            // https://core.telegram.org/bots/api#sendmessage
            await ctx.reply(
                `This is a test bot for demo.
                
Available commands are:

/${CMD.HELP} - display this text. 
/${CMD.SETTINGS} - configure this bot. 
/${CMD.START} - start the bot.`,
                {parse_mode: 'HTML',}
            );
        };
    }
}
