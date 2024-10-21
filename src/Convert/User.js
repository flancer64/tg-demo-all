/**
 * Converts Domain DTO to/from related DTOs (Persistent, etc.).
 * @implements Demo_Back_Api_Convert
 */
export default class Demo_Back_Convert_User {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Demo_Back_Dto_User} domDto
     * @param {Demo_Back_Store_RDb_Schema_User} rdbUser
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Demo_Back_Dto_User$: domDto,
            Demo_Back_Store_RDb_Schema_User$: rdbUser,
        }
    ) {
        // INSTANCE METHODS

        /**
         * Converts Persistent DTO (from the database) into Domain DTO.
         * @param {Demo_Back_Store_RDb_Schema_User.Dto} dbUser
         * @returns {Demo_Back_Dto_User.Dto}
         */
        this.db2dom = function ({dbUser}) {
            // Check for required object
            if (!dbUser) throw new Error('dbUser is required for conversion.');

            const res = domDto.createDto();
            res.dateRegistered = cast.date(dbUser?.date_registered);
            res.id = cast.int(dbUser?.id);
            res.lang = cast.string(dbUser?.language);
            res.nameFirst = cast.string(dbUser?.name_first);
            res.nameLast = cast.string(dbUser?.name_last);
            res.telegramId = cast.int(dbUser?.telegram_id);
            res.telegramUser = cast.string(dbUser?.telegram_user);
            return res;
        };

        /**
         * The structure of the returned value.
         * @typedef {Object} Share2RdbResult
         * @property {Demo_Back_Store_RDb_Schema_User.Dto} dbUser
         * @memberof Demo_Back_Convert_User
         */

        /**
         * Converts Domain DTO into Persistent DTO for database storage.
         * @param {Demo_Back_Dto_User.Dto} user
         * @return {Share2RdbResult}
         */
        this.dom2db = function ({user}) {
            // Check for required object
            if (!user) throw new Error('user is required for conversion.');

            const dbUser = rdbUser.createDto();
            dbUser.date_registered = cast.date(user?.dateRegistered);
            dbUser.id = cast.int(user?.id);
            dbUser.language = cast.string(user?.lang);
            dbUser.name_first = cast.string(user?.nameFirst);
            dbUser.name_last = cast.string(user?.nameLast);
            dbUser.telegram_id = cast.int(user?.telegramId);
            dbUser.telegram_user = cast.string(user?.telegramUser);
            return {dbUser};
        };
    }
}
