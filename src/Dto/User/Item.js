/**
 * The data structure of a user list item for Business Logic (Domain DTO).
 */
// MODULE'S VARS
/**
 * RDB queries use these attributes to compose aliases for fields.
 * @memberOf Demo_Back_Dto_User_Item
 */
const ATTR = {
    DATE_REGISTERED: 'dateRegistered',
    ID: 'id',
    LANG: 'lang',
    NAME: 'name',
    TELEGRAM_ID: 'telegramId',
    TELEGRAM_USER: 'telegramUser',
};

// MODULE'S CLASSES
/**
 * @memberOf Demo_Back_Dto_User_Item
 */
class Dto {
    /**
     * Date when user has been registered in the bot.
     * @type {Date}
     */
    dateRegistered;
    /**
     * Internal ID for the user.
     * @type {number}
     */
    id;
    /**
     * Preferred language for the user.
     * @type {string}
     */
    lang;
    /**
     * Display name for the user ("firstName lastName")
     * @type {string}
     */
    name;
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
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_Meta
 */
export default class Demo_Back_Dto_User_Item {
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
         * Create a new DTO and populate it with initialization data.
         * @param {Demo_Back_Dto_User_Item.Dto} [data]
         * @return {Demo_Back_Dto_User_Item.Dto}
         */
        this.createDto = function (data) {
            // Create new DTO and populate with initial data
            const res = Object.assign(new Dto(), data);

            // Cast known attributes
            res.dateRegistered = cast.date(data?.dateRegistered);
            res.id = cast.int(data?.id);
            res.lang = cast.string(data?.lang);
            res.name = cast.string(data?.name);
            res.telegramId = cast.int(data?.telegramId);
            res.telegramUser = cast.string(data?.telegramUser);
            return res;
        };

        this.getAttributes = () => ATTR;
    }
}
