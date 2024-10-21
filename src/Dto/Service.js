/**
 * Data structure for service information in the business logic layer (Domain DTO).
 */

// MODULE'S CLASSES
/**
 * Represents a Domain DTO for a service.
 * @memberOf Demo_Back_Dto_Service
 */
class Dto {
    /**
     * Date when the service was created.
     * @type {Date}
     */
    dateCreated;
    /**
     * Detailed description of the service.
     * @type {string}
     */
    description;
    /**
     * Unique ID of the service.
     * @type {number}
     */
    id;
    /**
     * Name of the service.
     * @type {string}
     */
    name;
}

/**
 * Factory class for creating service DTOs.
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Demo_Back_Dto_Service {
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
         * @param {Demo_Back_Dto_Service.Dto} [data]
         * @return {Demo_Back_Dto_Service.Dto}
         */
        this.createDto = function (data) {
            // Create a new DTO and populate it with the provided data
            const res = Object.assign(new Dto(), data);

            // Cast known attributes
            res.dateCreated = cast.date(data?.dateCreated);
            res.description = cast.string(data?.description);
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);

            return res;
        };
    }
}

