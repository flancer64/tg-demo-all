/**
 * Persistent DTO with metadata for the RDB entity: User.
 * @namespace Demo_Back_Store_RDb_Schema_User
 */
// MODULE'S VARS
/**
 * Path to the entity in the plugin's DEM.
 * @type {string}
 */
const ENTITY = '/user';

/**
 * @memberOf Demo_Back_Store_RDb_Schema_User
 * @type {Object}
 */
const ATTR = {
    DATE_REGISTERED: 'date_registered',
    ID: 'id',
    LANGUAGE: 'language',
    NAME_FIRST: 'name_first',
    NAME_LAST: 'name_last',
    TELEGRAM_ID: 'telegram_id',
    TELEGRAM_USER: 'telegram_user',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Demo_Back_Store_RDb_Schema_User
 */
class Dto {
    /**
     * Date when the entity was created.
     * @type {Date}
     */
    date_registered;
    /**
     * User's ID.
     * @type {number}
     */
    id;
    /**
     * User's preferred language.
     * @type {string}
     */
    language;
    /**
     * User's first name.
     * @type {string}
     */
    name_first;
    /**
     * User's last name.
     * @type {string}
     */
    name_last;
    /**
     * Reference to the user in Telegram.
     * @type {number}
     */
    telegram_id;
    /**
     * Username from Telegram.
     * @type {string}
     */
    telegram_user;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Demo_Back_Store_RDb_Schema_User {
    /**
     * @param {Demo_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            Demo_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * Creates a new DTO object.
         * @param {Demo_Back_Store_RDb_Schema_User.Dto} [data]
         * @return {Demo_Back_Store_RDb_Schema_User.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_registered = cast.date(data?.date_registered);
            res.id = cast.int(data?.id);
            res.language = cast.string(data?.language);
            res.name_first = cast.string(data?.name_first);
            res.name_last = cast.string(data?.name_last);
            res.telegram_id = cast.int(data?.telegram_id);
            res.telegram_user = cast.string(data?.telegram_user);
            return res;
        };

        /**
         * Documentation-only code.
         * The real implementation is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Demo_Back_Store_RDb_Schema_User.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}
