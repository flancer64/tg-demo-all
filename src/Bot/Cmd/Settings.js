/**
 * The handler for the 'settings' command.
 */
export default class Demo_Back_Bot_Cmd_Settings {
    constructor() {
        return (ctx) => {
            ctx.reply('Here you can configure your bot settings.');
        };
    }
}
