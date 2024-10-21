/**
 * Handles the 'settings' command.
 */
export default class Demo_Back_Bot_Cmd_Settings {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Demo_Back_Mod_Service} modService
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Demo_Back_Mod_Service$: modService,
        }
    ) {
        return async (ctx) => {
            const services = await modService.list();
            if (services.length === 0) {
                await modService.initDb();
                await ctx.reply('No services found in the database. New services have been created.');
                services.push(...await modService.list());
            }
            const lines = services.map((service) => `${service.id}: ${service.name}`).join('\n');
            await ctx.reply(`The following services are available:\n\n${lines}`);
        };
    }
}
