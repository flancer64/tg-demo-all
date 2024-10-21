/**
 * Persistent DTO with metadata for the RDB entity: Service.
 * @namespace Demo_Back_Store_RDb_Schema_Service
 */
// MODULE'S VARS
/**
 * Path to the entity in the plugin's DEM.
 * @type {string}
 */
const ENTITY = '/service';

/**
 * Attributes for the service entity in the RDB schema.
 * @memberOf Demo_Back_Store_RDb_Schema_Service
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    DESCRIPTION: 'description',
    ID: 'id',
    NAME: 'name',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * Represents a DTO for a service entity in the RDB schema.
 * @memberOf Demo_Back_Store_RDb_Schema_Service
 */
class Dto {
    /**
     * Date when the service was created.
     * @type {Date}
     */
    date_created;
    /**
     * Detailed description of the service.
     * @type {string}
     */
    description;
    /**
     * Service ID.
     * @type {number}
     */
    id;
    /**
     * Service name.
     * @type {string}
     */
    name;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Demo_Back_Store_RDb_Schema_Service {
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
         * Creates a new DTO object for a service.
         * @param {Demo_Back_Store_RDb_Schema_Service.Dto} [data]
         * @return {Demo_Back_Store_RDb_Schema_Service.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = cast.date(data?.date_created);
            res.description = cast.string(data?.description);
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);
            return res;
        };

        /**
         * Returns the attributes for the service entity.
         * Documentation-only code. The real implementation is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Demo_Back_Store_RDb_Schema_Service.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(
            this,
            `${DEF.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}
