/**
 * The conversation for the '/start' command.
 *
 * 1. The bot checks if the user is registered; if not, it registers the user.
 * 2. The bot displays a list of available services for subscription.
 * 3. The bot prompts the user to enter the service number, repeating the request until a valid number is provided.
 * 4. The bot asks the user to confirm the subscription to the selected service.
 * 5. Once confirmed, the bot completes the subscription and ends the conversation.
 */
// IMPORTS

// CLASSES
export default class Demo_Back_Bot_Conv_Start {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Demo_Back_Mod_Service} modService
     * @param {Demo_Back_Mod_User} modUser
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Demo_Back_Mod_Service$: modService,
            Demo_Back_Mod_User$: modUser,
        }
    ) {
        return async (conversation, ctx) => {
            try {
                const sess = conversation.session;
                sess.count = sess.count ?? 0;
                sess.count++;
                const telegramId = ctx.from.id;
                const username = ctx.from.username;
                let msg = `Hi @${username}!\n`;
                logger.info(`username: ${username}, count: ${sess.count}`);

                // 1. Check if the user is registered
                let user = await modUser.read({telegramId}); // read user on every message in dialog
                if (!user) {
                    // 2. Register the user if not found
                    user = await conversation.external(
                        () => {
                            const dto = modUser.composeEntity();
                            dto.lang = ctx.from.language_code;
                            dto.nameFirst = ctx.from.first_name;
                            dto.nameLast = ctx.from.last_name;
                            dto.telegramUser = username;
                            dto.telegramId = telegramId;
                            modUser.create({dto});
                        }
                    );
                    msg += `You are a new user and have been registered successfully.`;
                } else {
                    msg += `You are already registered.`;
                }
                await ctx.reply(msg);

                // 3. Show the list of available services
                let services = await conversation.external(() => modService.list());

                if (services.length === 0) {
                    await ctx.reply(`No services are currently available.`);
                } else {
                    let list = services.map((service) => `${service.id}: ${service.name}`).join('\n');
                    await ctx.reply(`Please select a service by number:\n${list}`);
                    let selected;
                    do {
                        // Wait for user input
                        const response = await conversation.wait();
                        const id = parseInt(response.message.text);
                        selected = await conversation.external({
                            task: (id) => modService.read({id}),
                            args: [id]

                        });
                        // Validate the service number
                        if (!selected) await ctx.reply(`Invalid selection. Please enter a valid service number.`);
                    } while (!selected);

                    // 4. Print service details and ask for confirmation
                    msg = `Service details:
                    
ID: ${selected.id}
Name: ${selected.name}
Description: ${selected.description}

Do you want to subscribe? (yes/no)
`;
                    await ctx.reply(msg);
                    let confirmed = false;
                    while (!confirmed) {
                        const confirmation = await conversation.wait();
                        const confirmationText = confirmation.message.text.toLowerCase();

                        if (confirmationText === 'yes') {
                            // 5. Subscribe the user and finish the conversation
                            const success = await conversation.external(
                                () => modUser.subscribe({userId: user.id, serviceId: selected.id})
                            );
                            msg = success
                                ? `You have been successfully subscribed to "${selected.name}".`
                                : `An error occurred during the subscription process.`;
                            await ctx.reply(msg);
                            confirmed = true;
                        } else if (confirmationText === 'no') {
                            await ctx.reply(`Subscription canceled. You can start again by using /start.`);
                            confirmed = true;
                        } else {
                            await ctx.reply(`Please respond with "yes" or "no".`);
                        }
                    }
                }

                await ctx.reply(`The /start conversation has been completed.`);
            } catch (e) {
                await ctx.reply(`An error occurred while processing your request: ${e.message}`);
                logger.exception(e);
            }
        };
    }
}

