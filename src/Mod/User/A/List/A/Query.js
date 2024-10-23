/**
 * RDB query builder to select users.
 * @see Events_Back_Act_User_Create_A_Query (has been copied from)
 */
export default class Demo_Back_Mod_User_A_List_A_Query {
    /**
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Demo_Back_Store_RDb_Schema_User} rdbUser
     * @param {Demo_Back_Dto_User_Item} dtoItem
     */
    constructor(
        {
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Demo_Back_Store_RDb_Schema_User$: rdbUser,
            Demo_Back_Dto_User_Item$: dtoItem,
        }
    ) {
        // VARS
        const A_USER = rdbUser.getAttributes();

        /** @type {Object<string, string>} */
        let MAP;

        /**
         * Aliases for the columns in the query.
         * @memberof Demo_Back_Mod_User_A_List_A_Query
         */
        const COL = dtoItem.getAttributes();
        Object.freeze(COL);

        /**
         * Map for tables aliases in the query.
         * @type {Object}
         * @memberOf Demo_Back_Mod_User_A_List_A_Query
         */
        const TBL = {
            USER: 'u',
        };
        Object.freeze(TBL);

        // FUNCS

        /**
         * Compose and return map for columns in select (fields and expressions).
         * @return {Object<string, string>}
         */
        function getMap() {
            if (!MAP) {
                const knex = conn.getKnex();
                /**
                 * The map associates query columns with 'table.field' pairs.
                 * @type {Object<string, string>}
                 */
                const MAP_FLD = {
                    [COL.DATE_REGISTERED]: `${TBL.USER}.${A_USER.DATE_REGISTERED}`,
                    [COL.ID]: `${TBL.USER}.${A_USER.ID}`,
                    [COL.LANG]: `${TBL.USER}.${A_USER.LANGUAGE}`,
                    [COL.NAME]: knex.raw(`CONCAT(${TBL.USER}.${A_USER.NAME_FIRST}, ' ', ${TBL.USER}.${A_USER.NAME_LAST})`),
                    [COL.TELEGRAM_ID]: `${TBL.USER}.${A_USER.TELEGRAM_ID}`,
                    [COL.TELEGRAM_USER]: `${TBL.USER}.${A_USER.TELEGRAM_USER}`,
                };
                /**
                 * The map associates aggregated query columns with SQL expressions.
                 * @type {Object<string, string>}
                 */
                const MAP_AGG = {};
                MAP = Object.assign({}, MAP_FLD, MAP_AGG);
            }
            return MAP;
        }

        // INSTANCE METHODS
        this.build = function (trx) {
            // VARS
            /* knex related  objects */
            const tUser = {[TBL.USER]: trx.getTableName(rdbUser)};
            // MAIN
            /** @type {Knex.QueryBuilder} */
            const res = trx.createQuery();
            // main table
            res.table(tUser);
            res.select(getMap());
            // join another table
            // res.leftJoin(tUser, `${TBL.VISIT}.${A_VISIT.USER_REF}`, `${TBL.USER}.${A_USER.ID}`);
            // order by
            res.orderBy([{column: `${TBL.USER}.${A_USER.DATE_REGISTERED}`, order: 'asc'}]);
            return res;
        };

        /**
         * Get query columns (field's aliases).
         * @return {typeof Demo_Back_Mod_User_A_List_A_Query.COL}
         */
        this.getColumns = () => COL;

        /**
         *
         * @returns {typeof Demo_Back_Mod_User_A_List_A_Query.TBL}
         */
        this.getTables = () => TBL;

        /**
         * Map query columns to table.field pairs or expressions.
         * @param {string} col
         */
        this.mapColumn = function (col) {
            const map = getMap();
            return map[col];
        };
    }
}
