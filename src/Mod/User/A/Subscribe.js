/**
 * Creates a new subscription in the RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Demo_Back_Mod_User_A_Subscribe {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Demo_Back_Store_RDb_Schema_User_Subscription} rdbUserSubs
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Demo_Back_Store_RDb_Schema_User_Subscription$: rdbUserSubs,
        }
    ) {
        /**
         * Executes the action to create a new subscription.
         *
         * @param {Object} params - Parameters for the subscription creation.
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx - Database transaction object.
         * @param {number} params.userId - The ID of the user.
         * @param {number} params.serviceId - The ID of the service.
         *
         * @return {Promise<boolean>} - A promise that resolves to `true` if the subscription was created successfully.
         */
        this.act = async function ({trx, userId, serviceId}) {
            const dto = rdbUserSubs.createDto();
            dto.service_ref = serviceId;
            dto.user_ref = userId;
            const key = await crud.create(trx, rdbUserSubs, dto);
            return Boolean(key);
        };
    }
}
