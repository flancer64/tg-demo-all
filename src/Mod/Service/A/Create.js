/**
 * Creates a new service in the RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_Service_A_Create {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Demo_Back_Store_RDb_Schema_Service} rdbService
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Demo_Back_Store_RDb_Schema_Service$: rdbService,
        }
    ) {
        // VARIABLES
        const A_SERVICE = rdbService.getAttributes();

        // MAIN
        /**
         * Creates a new service in the database.
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx - Database transaction object.
         * @param {Demo_Back_Store_RDb_Schema_Service.Dto} params.dbService - DTO for the service being created.
         *
         * @return {Promise<number>} - The ID of the newly created service.
         */
        this.act = async function ({trx, dbService}) {
            const {[A_SERVICE.ID]: id} = await crud.create(trx, rdbService, dbService);
            return id;
        };
    }
}
