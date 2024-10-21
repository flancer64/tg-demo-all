/**
 * Handler for the 'start' command.
 */
export default class Demo_Back_Bot_Cmd_Start {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Demo_Back_Util_Format} utilFormat
     * @param {Demo_Back_Mod_User} modUser
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Demo_Back_Util_Format$: utilFormat,
            Demo_Back_Mod_User$: modUser,
        }
    ) {
        // FUNCS

        async function checkCreate(ctx) {
            const from = ctx.from;
            const telegramId = from.id;
            const username = from.username;
            let msg = `Hi @${username}!\n\n`;

            // Check if the user already exists in the system
            /** @type {Demo_Back_Dto_User.Dto} */
            let user = await modUser.read({telegramId});
            if (user) {
                msg += `Welcome back!\n`;
            } else {
                msg += `You are a new user.\n`;
                //
                user = modUser.composeEntity();
                user.lang = from.language_code;
                user.nameFirst = from.first_name;
                user.nameLast = from.last_name;
                user.telegramId = telegramId;
                user.telegramUser = username;
                user = await modUser.create({dto: user});
                msg += `You are registered with ID=${user.id}.\n`;
            }
            await ctx.reply(msg);
        }

        async function checkDelete(ctx) {
            const from = ctx.from;
            const telegramId = from.id;
            const username = from.username;
            let msg = `Hi @${username}!\n\n`;

            // Check if the user already exists in the system
            /** @type {Demo_Back_Dto_User.Dto} */
            let user = await modUser.read({telegramId});
            if (user) {
                msg += `I will delete you!\n\n`;

                const success = await modUser.delete({dto: user});
                if (success) {
                    msg += `User '${user.telegramUser}' has been deleted.\n`;
                } else {
                    msg += `Cannot delete user '${user.telegramUser}'`;
                }

            } else {
                msg += `You are a new user.\n`;
                //
                user = modUser.composeEntity();
                user.lang = from.language_code;
                user.nameFirst = from.first_name;
                user.nameLast = from.last_name;
                user.telegramId = telegramId;
                user.telegramUser = username;
                user = await modUser.create({dto: user});
                msg += `You are registered with ID=${user.id}.\n`;
            }
            await ctx.reply(msg, {
                parse_mode: 'HTML',
            });
        }

        async function checkList(ctx) {
            let msg = `Registered users:\n\n`;
            const items = await modUser.list();
            for (const item of items) {
                msg += `[${item.id}][${item.telegramId}] ${item.name} (${item.telegramUser}).\n`;
            }
            await ctx.reply(msg);
        }

        async function checkUpdate(ctx) {
            const from = ctx.from;
            const telegramId = from.id;
            const username = from.username;
            let msg = `Hi @${username}!\n\n`;

            // Check if the user already exists in the system
            /** @type {Demo_Back_Dto_User.Dto} */
            let user = await modUser.read({telegramId});
            if (user) {
                msg += `I will update you!\n\n`;
                const buf = user.nameFirst;
                user.nameFirst = user.nameLast;
                user.nameLast = buf;
                user = await modUser.update({dto: user});
                msg += `Updated data:\n`;
                msg += `ID: <b>${user.id}</b>\n`;
                msg += `Telegram ID: <b>${user.telegramId}</b>\n`;
                msg += `Telegram User: <b>${user.telegramUser}</b>\n`;
                msg += `Name: <b>${user.nameFirst} ${user.nameLast}</b>\n`;
                msg += `Registration Date: <b>${utilFormat.dateTime(user.dateRegistered)}</b>\n`;
            } else {
                msg += `You are a new user.\n`;
                //
                user = modUser.composeEntity();
                user.lang = from.language_code;
                user.nameFirst = from.first_name;
                user.nameLast = from.last_name;
                user.telegramId = telegramId;
                user.telegramUser = username;
                user = await modUser.create({dto: user});
                msg += `You are registered with ID=${user.id}.\n`;
            }
            await ctx.reply(msg, {
                parse_mode: 'HTML',
            });
        }

        // MAIN
        return async (ctx) => {
            try {
                await checkCreate(ctx);
            } catch (e) {
                await ctx.reply(`Error while processing: ${e}`);
                logger.exception(e);
            }
        };
    }
}
