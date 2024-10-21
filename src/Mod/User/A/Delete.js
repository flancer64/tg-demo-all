/**
 * Delete existing user from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_User_A_Delete {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Demo_Back_Store_RDb_Schema_User} rdbUser
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Demo_Back_Store_RDb_Schema_User$: rdbUser,
        }
    ) {
        /**
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {Demo_Back_Store_RDb_Schema_User.Dto} params.dbUser
         *
         * @return {Promise<number>}
         */
        this.act = async function ({trx, dbUser}) {
            return await crud.deleteOne(trx, rdbUser, dbUser.id);
        };
    }

}