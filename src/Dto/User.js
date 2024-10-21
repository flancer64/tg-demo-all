/**
 * Data structure for user information in the business logic layer (Domain DTO).
 */

// MODULE'S CLASSES
/**
 * @memberOf Demo_Back_Dto_User
 */
class Dto {
    /**
     * Date when the user was registered in the bot.
     * @type {Date}
     */
    dateRegistered;
    /**
     * Internal user ID.
     * @type {number}
     */
    id;
    /**
     * User's preferred language.
     * @type {string}
     */
    lang;
    /**
     * User's first name.
     * @type {string}
     */
    nameFirst;
    /**
     * User's last name.
     * @type {string}
     */
    nameLast;
    /**
     * Telegram user ID.
     * @type {number}
     */
    telegramId;
    /**
     * Telegram username.
     * @type {string}
     */
    telegramUser;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Demo_Back_Dto_User {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * Creates a new DTO and populates it with initialization data.
         * @param {Demo_Back_Dto_User.Dto} [data]
         * @return {Demo_Back_Dto_User.Dto}
         */
        this.createDto = function (data) {
            // Create a new DTO and populate it with initial data
            const res = Object.assign(new Dto(), data);

            // Cast known attributes
            res.dateRegistered = cast.date(data?.dateRegistered);
            res.id = cast.int(data?.id);
            res.lang = cast.string(data?.lang);
            res.nameFirst = cast.string(data?.nameFirst);
            res.nameLast = cast.string(data?.nameLast);
            res.telegramId = cast.int(data?.telegramId);
            res.telegramUser = cast.string(data?.telegramUser);

            return res;
        };
    }
}
