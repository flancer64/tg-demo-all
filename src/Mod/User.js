/**
 * The model for User to manipulate with data in storages.
 *
 * @implements TeqFw_Core_Shared_Api_Model
 */
export default class Demo_Back_Mod_User {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Demo_Back_Dto_User} dtoUser
     * @param {Demo_Back_Convert_User} convUser
     * @param {Demo_Back_Mod_User_A_Create} aCreate
     * @param {Demo_Back_Mod_User_A_Delete} aDelete
     * @param {Demo_Back_Mod_User_A_List} aList
     * @param {Demo_Back_Mod_User_A_Read} aRead
     * @param {Demo_Back_Mod_User_A_Update} aUpdate
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Demo_Back_Dto_User$: dtoUser,
            Demo_Back_Convert_User$: convUser,
            Demo_Back_Mod_User_A_Create$: aCreate,
            Demo_Back_Mod_User_A_Delete$: aDelete,
            Demo_Back_Mod_User_A_List$: aList,
            Demo_Back_Mod_User_A_Read$: aRead,
            Demo_Back_Mod_User_A_Update$: aUpdate,
        }
    ) {
        /**
         * @type {function(Demo_Back_Dto_User.Dto=): Demo_Back_Dto_User.Dto}
         */
        this.composeEntity = dtoUser.createDto;

        /**
         * @type {function(Demo_Back_Dto_User.Dto=): Demo_Back_Dto_User.Dto}
         */
        this.composeItem = dtoUser.createDto;

        /**
         * Create a new user.
         * @param {Object} params
         * @param {Demo_Back_Dto_User.Dto} params.dto
         * @returns {Promise<Demo_Back_Dto_User.Dto>}
         */
        this.create = async function ({dto}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbUser} = convUser.dom2db({user: dto});
                const id = await aCreate.act({trx, dbUser});
                {
                    const {dbUser} = await aRead.act({trx, id});
                    res = convUser.db2dom({dbUser});
                }
                // Create new user in the store
                logger.info(`User ${res.telegramUser} created successfully (id:${dbUser.telegram_id}).`);
                await trx.commit();
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error creating user: ${error.message}`);
                throw error;
            }
        };

        /**
         * Create a user.
         * @param {Object} params
         * @param {Demo_Back_Dto_User.Dto} params.dto
         * @returns {Promise<boolean>}
         */
        this.delete = async function ({dto}) {
            let res = false;
            const trx = await conn.startTransaction();
            try {
                const {dbUser} = convUser.dom2db({user: dto});
                const deleted = await aDelete.act({trx, dbUser});
                await trx.commit();
                res = (deleted === 1);
                if (res) logger.info(`User ${dbUser.telegram_user} deleted successfully (id:${dbUser.telegram_id}).`);
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error deleting user: ${error.message}`);
                throw error;
            }
        };

        /**
         * List all items.
         * @param {Object} [params]
         * @returns {Promise<Demo_Back_Dto_User_Item.Dto[]>}
         */
        this.list = async function ({} = {}) {
            const res = [];
            const trx = await conn.startTransaction();
            try {
                const {items} = await aList.act({trx});
                await trx.commit();
                res.push(...items);
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error listing users: ${error.message}`);
                throw error;
            }
        };

        /**
         * Read user data by ID
         * @param {Object} params - User data
         * @param {number} [params.id] - User ID
         * @param {number} [params.telegramId] - User ID
         * @returns {Promise<Demo_Back_Dto_User.Dto>} - User DTO or null if not found
         */
        this.read = async function ({id, telegramId}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbUser} = await aRead.act({trx, id, telegramId});
                await trx.commit();
                if (dbUser) {
                    res = convUser.db2dom({dbUser});
                    logger.info(`User ${res.telegramUser} read successfully (id:${res.telegramId}).`);
                } else {
                    logger.info(`User with ID ${telegramId} not found.`);
                }
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error reading user: ${error.message}`);
                throw error;
            }
        };

        /**
         * Update user data
         * @param {Object} params
         * @param {Demo_Back_Dto_User.Dto} params.dto
         * @returns {Promise<Demo_Back_Dto_User.Dto>} - Updated user DTO or null if not found
         */
        this.update = async function ({dto}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                // find a user to update
                const {dbUser} = await aRead.act({trx, id: dto?.id, telegramId: dto?.telegramId});
                if (dbUser) {
                    // only name can be updated if found
                    if ((dbUser.name_first !== dto.nameFirst) || (dbUser.name_last !== dto.nameLast)) {
                        dbUser.name_first = dto.nameFirst;
                        dbUser.name_last = dto.nameLast;
                        await aUpdate.act({trx, dbUser});
                        logger.info(`User ${dbUser.telegram_user} updated successfully (id:${dbUser.telegram_id}).`);
                    }
                    res = convUser.db2dom({dbUser});
                } else {
                    logger.info(`User with ID ${dto.telegramId} not found.`);
                }
                await trx.commit();
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error updating user: ${error.message}`);
                throw error;
            }
        };

    }
}
