/**
 * Create new user in RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_User_A_Create {
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
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {Demo_Back_Store_RDb_Schema_User.Dto} params.dbUser
         *
         * @return {Promise<number>}
         */
        this.act = async function ({trx, dbUser}) {
            const {[A_USER.ID]: id} = await crud.create(trx, rdbUser, dbUser);
            return id;
        };
    }

}