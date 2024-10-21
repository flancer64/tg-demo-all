/**
 * Read user list data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_User_A_List {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Demo_Back_Store_RDb_Schema_User} rdbUser
     * @param {Demo_Back_Mod_User_A_List_A_Query} aQuery
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Demo_Back_Store_RDb_Schema_User$: rdbUser,
            Demo_Back_Mod_User_A_List_A_Query$: aQuery,
        }
    ) {
        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Demo_Back_Dto_User_Item.Dto[]} [items]
         * @memberof Demo_Back_Mod_User_A_List
         */

        /**
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         *
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx}) {
            const query = aQuery.build(trx);
            /** @type {Demo_Back_Dto_User_Item.Dto[]} */
            const items = await query;
            return {items};
        };
    }
}
