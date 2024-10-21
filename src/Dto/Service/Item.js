/**
 * The data structure of a service list item for Business Logic (Domain DTO).
 */
// MODULE'S VARS
/**
 * RDB queries use these attributes to compose field aliases.
 * @memberOf Demo_Back_Dto_Service_Item
 */
const ATTR = {
    DATE_CREATED: 'dateCreated',
    ID: 'id',
    NAME: 'name',
};

// MODULE'S CLASSES
/**
 * Represents a Domain DTO for a service item.
 * @memberOf Demo_Back_Dto_Service_Item
 */
class Dto {
    /**
     * Date when the service was created.
     * @type {Date}
     */
    dateCreated;
    /**
     * Internal ID for the service.
     * @type {number}
     */
    id;
    /**
     * Display name for the service.
     * @type {string}
     */
    name;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_Meta
 */
export default class Demo_Back_Dto_Service_Item {
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
         * Creates a new DTO and populates it with the provided initialization data.
         * @param {Demo_Back_Dto_Service_Item.Dto} [data]
         * @return {Demo_Back_Dto_Service_Item.Dto}
         */
        this.createDto = function (data) {
            // Create a new DTO and populate it with initial data
            const res = Object.assign(new Dto(), data);

            // Cast known attributes
            res.dateCreated = cast.date(data?.dateCreated);
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);
            return res;
        };

        /**
         * Returns the attribute mapping for this DTO.
         * @return {Object}
         */
        this.getAttributes = () => ATTR;
    }
}
