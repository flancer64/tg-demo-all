/**
 * Create a new user in the RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_User_A_Create {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Demo_Back_Store_RDb_Schema_User} rdbUser
     */
    constructor({
                    TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
                    Demo_Back_Store_RDb_Schema_User$: rdbUser
                }) {
        const A_USER = rdbUser.getAttributes();

        /**
         * Create a new user in the database.
         *
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {Demo_Back_Store_RDb_Schema_User.Dto} params.dbUser
         * @return {Promise<number>}
         * @throws {Error} if `telegram_id` or `telegram_user` are missing.
         */
        this.act = async ({trx, dbUser}) => {
            const {telegram_id, telegram_user} = dbUser;
            if (!telegram_id || !telegram_user) {
                throw new Error('Cannot register new Telegram user without name or ID.');
            }
            const {[A_USER.ID]: id} = await crud.create(trx, rdbUser, dbUser);
            return id;
        };
    }
}
