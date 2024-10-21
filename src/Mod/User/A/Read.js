/**
 * Read user data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_User_A_Read {
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
        // VARS
        const A_USER = rdbUser.getAttributes();

        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Demo_Back_Store_RDb_Schema_User.Dto} [dbUser]
         * @memberof Demo_Back_Mod_User_A_Read
         */

        /**
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {number} [params.id]
         * @param {number} [params.telegramId]
         *
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx, id, telegramId}) {
            const key = (id) ?? {[A_USER.TELEGRAM_ID]: telegramId};
            /** @type {Demo_Back_Store_RDb_Schema_User.Dto} */
            const dbUser = await crud.readOne(trx, rdbUser, key);
            return {dbUser};
        };
    }

}