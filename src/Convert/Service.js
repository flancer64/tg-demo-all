/**
 * Converts Domain DTO to/from related DTOs (Persistent, etc.).
 * @implements Demo_Back_Api_Convert
 */
export default class Demo_Back_Convert_Service {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Demo_Back_Dto_Service} domDto
     * @param {Demo_Back_Store_RDb_Schema_Service} rdbService
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Demo_Back_Dto_Service$: domDto,
            Demo_Back_Store_RDb_Schema_Service$: rdbService,
        }
    ) {
        // INSTANCE METHODS

        /**
         * Converts a Persistent DTO (from the database) into a Domain DTO.
         * @param {Demo_Back_Store_RDb_Schema_Service.Dto} dbService
         * @returns {Demo_Back_Dto_Service.Dto}
         */
        this.db2dom = function ({dbService}) {
            // Check if the required object is provided
            if (!dbService) throw new Error('dbService is required for conversion.');

            const res = domDto.createDto();
            res.dateCreated = cast.date(dbService?.date_created);
            res.description = cast.string(dbService?.description);
            res.id = cast.int(dbService?.id);
            res.name = cast.string(dbService?.name);
            return res;
        };

        /**
         * The structure of the returned value.
         * @typedef {Object} Share2RdbResult
         * @property {Demo_Back_Store_RDb_Schema_Service.Dto} dbService
         * @memberof Demo_Back_Convert_Service
         */

        /**
         * Converts a Domain DTO into a Persistent DTO for database storage.
         * @param {Demo_Back_Dto_Service.Dto} service
         * @return {Share2RdbResult}
         */
        this.dom2db = function ({service}) {
            // Check if the required object is provided
            if (!service) throw new Error('service is required for conversion.');

            const dbService = rdbService.createDto();
            dbService.date_created = cast.date(service?.dateCreated);
            dbService.description = cast.string(service?.description);
            dbService.id = cast.int(service?.id);
            dbService.name = cast.string(service?.name);
            return {dbService};
        };
    }
}
