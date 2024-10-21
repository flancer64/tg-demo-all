/**
 * RDB query builder for selecting services.
 * @see Events_Back_Act_User_Create_A_Query (copied from this class)
 */
export default class Demo_Back_Mod_Service_A_List_A_Query {
    /**
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Demo_Back_Store_RDb_Schema_Service} rdbService
     * @param {Demo_Back_Dto_Service_Item} dtoItem
     */
    constructor(
        {
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Demo_Back_Store_RDb_Schema_Service$: rdbService,
            Demo_Back_Dto_Service_Item$: dtoItem,
        }
    ) {
        // VARIABLES
        const A_SERVICE = rdbService.getAttributes();

        /** @type {Object<string, string>} */
        let MAP;

        /**
         * Aliases for the columns used in the query.
         * @memberof Demo_Back_Mod_Service_A_List_A_Query
         */
        const COL = dtoItem.getAttributes();
        Object.freeze(COL);

        /**
         * Aliases for the tables used in the query.
         * @type {Object}
         * @memberOf Demo_Back_Mod_Service_A_List_A_Query
         */
        const TBL = {
            SERVICE: 's',
        };
        Object.freeze(TBL);

        // FUNCTIONS

        /**
         * Generates and returns a map of query columns (fields and expressions).
         * @return {Object<string, string>}
         */
        function getMap() {
            if (!MAP) {
                const knex = conn.getKnex();
                /**
                 * A map that associates query columns with 'table.field' pairs.
                 * @type {Object<string, string>}
                 */
                const MAP_FLD = {
                    [COL.DATE_CREATED]: `${TBL.SERVICE}.${A_SERVICE.DATE_CREATED}`,
                    [COL.ID]: `${TBL.SERVICE}.${A_SERVICE.ID}`,
                    [COL.NAME]: `${TBL.SERVICE}.${A_SERVICE.NAME}`,
                };
                /**
                 * A map that associates aggregated query columns with SQL expressions.
                 * @type {Object<string, string>}
                 */
                const MAP_AGG = {};
                MAP = Object.assign({}, MAP_FLD, MAP_AGG);
            }
            return MAP;
        }

        // INSTANCE METHODS
        /**
         * Builds and returns the query.
         * @param {Knex.Transaction} trx - Database transaction object.
         * @return {Knex.QueryBuilder}
         */
        this.build = function (trx) {
            // VARIABLES
            /* Knex-related objects */
            const tSrv = {[TBL.SERVICE]: trx.getTableName(rdbService)};
            // MAIN
            /** @type {Knex.QueryBuilder} */
            const res = trx.createQuery();
            // Define the main table
            res.table(tSrv);
            res.select(getMap());
            // Optionally, join another table (example commented out)
            // res.leftJoin(tUser, `${TBL.VISIT}.${A_VISIT.USER_REF}`, `${TBL.USER}.${A_USER.ID}`);
            // Order by
            res.orderBy([{column: `${TBL.SERVICE}.${A_SERVICE.DATE_CREATED}`, order: 'asc'}]);
            return res;
        };

        /**
         * Returns query column aliases.
         * @return {typeof Demo_Back_Mod_Service_A_List_A_Query.COL}
         */
        this.getColumns = () => COL;

        /**
         * Returns table aliases.
         * @returns {typeof Demo_Back_Mod_Service_A_List_A_Query.TBL}
         */
        this.getTables = () => TBL;

        /**
         * Maps query columns to 'table.field' pairs or SQL expressions.
         * @param {string} col - The column alias to map.
         * @return {string}
         */
        this.mapColumn = function (col) {
            const map = getMap();
            return map[col];
        };
    }
}

