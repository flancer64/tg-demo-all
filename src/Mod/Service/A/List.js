/**
 * Reads the list of services from the RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_Service_A_List {
    /**
     * @param {Demo_Back_Mod_Service_A_List_A_Query} aQuery
     */
    constructor(
        {
            Demo_Back_Mod_Service_A_List_A_Query$: aQuery,
        }
    ) {
        // MAIN
        /**
         * Structure of the returned result.
         * @typedef {Object} ActResult
         * @property {Demo_Back_Dto_Service_Item.Dto[]} [items] - List of service items.
         * @memberof Demo_Back_Mod_Service_A_List
         */

        /**
         * Executes the action to retrieve the list of services.
         *
         * @param {Object} params - Parameters for the action.
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx - Database transaction object.
         *
         * @return {Promise<ActResult>} - A promise that resolves with the list of services.
         */
        this.act = async function ({trx}) {
            const query = aQuery.build(trx);
            /** @type {Demo_Back_Dto_Service_Item.Dto[]} */
            const items = await query;
            return {items};
        };
    }
}
