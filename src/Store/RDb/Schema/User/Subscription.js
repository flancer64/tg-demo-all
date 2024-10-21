/**
 * Persistent DTO with metadata for the RDB entity: Subscription.
 * @namespace Demo_Back_Store_RDb_Schema_User_Subscription
 */
// MODULE'S VARS
/**
 * Path to the entity in the plugin's DEM.
 * @type {string}
 */
const ENTITY = '/user/subscription';

/**
 * Attributes for the subscription entity in the RDB schema.
 * @memberOf Demo_Back_Store_RDb_Schema_User_Subscription
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    SERVICE_REF: 'service_ref',
    USER_REF: 'user_ref',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * Represents a DTO for a subscription entity in the RDB schema.
 * @memberOf Demo_Back_Store_RDb_Schema_User_Subscription
 */
class Dto {
    /**
     * Date when the subscription was created.
     * @type {Date}
     */
    date_created;
    /**
     * Reference to the service.
     * @type {number}
     */
    service_ref;
    /**
     * Reference to the user.
     * @type {number}
     */
    user_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Demo_Back_Store_RDb_Schema_User_Subscription {
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
         * Creates a new DTO object for a subscription.
         * @param {Demo_Back_Store_RDb_Schema_User_Subscription.Dto} [data]
         * @return {Demo_Back_Store_RDb_Schema_User_Subscription.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = cast.date(data?.date_created);
            res.service_ref = cast.int(data?.service_ref);
            res.user_ref = cast.int(data?.user_ref);
            return res;
        };

        /**
         * Returns the attributes for the subscription entity.
         * Documentation-only code. The real implementation is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Demo_Back_Store_RDb_Schema_User_Subscription.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(
            this,
            `${DEF.NAME}${ENTITY}`,
            ATTR,
            [ATTR.SERVICE_REF, ATTR.USER_REF],
            Dto
        );
    }
}
