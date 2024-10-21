/**
 * Reads user data from the RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_Service_A_Read {
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
         * The structure of the returned result.
         * @typedef {Object} ActResult
         * @property {Demo_Back_Store_RDb_Schema_Service.Dto} [dbService] - The service data retrieved from the database.
         * @memberof Demo_Back_Mod_Service_A_Read
         */

        /**
         * Executes the action to read a service from the database.
         *
         * @param {Object} params - Parameters for the action.
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx - Database transaction object.
         * @param {number} [params.id] - The ID of the service to read.
         *
         * @return {Promise<ActResult>} - A promise that resolves with the service data.
         */
        this.act = async function ({trx, id}) {
            /** @type {Demo_Back_Store_RDb_Schema_Service.Dto} */
            const dbService = await crud.readOne(trx, rdbService, id);
            return {dbService};
        };
    }
}
