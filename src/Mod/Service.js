/**
 * The model for Service to manipulate data in storage.
 *
 * @implements TeqFw_Core_Shared_Api_Model
 */
export default class Demo_Back_Mod_Service {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Demo_Back_Dto_Service} dtoService
     * @param {Demo_Back_Convert_Service} convService
     * @param {Demo_Back_Mod_Service_A_Create} aCreate
     * @param {Demo_Back_Mod_Service_A_List} aList
     * @param {Demo_Back_Mod_Service_A_Read} aRead
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Demo_Back_Dto_Service$: dtoService,
            Demo_Back_Convert_Service$: convService,
            Demo_Back_Mod_Service_A_Create$: aCreate,
            Demo_Back_Mod_Service_A_List$: aList,
            Demo_Back_Mod_Service_A_Read$: aRead,
        }
    ) {
        /**
         * @type {function(Demo_Back_Dto_Service.Dto=): Demo_Back_Dto_Service.Dto}
         */
        this.composeEntity = dtoService.createDto;

        /**
         * @type {function(Demo_Back_Dto_Service.Dto=): Demo_Back_Dto_Service.Dto}
         */
        this.composeItem = dtoService.createDto;

        /**
         * Creates a new service.
         * @param {Object} params
         * @param {Demo_Back_Dto_Service.Dto} params.dto
         * @returns {Promise<Demo_Back_Dto_Service.Dto>}
         */
        this.create = async function ({dto}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbService} = convService.dom2db({service: dto});
                const id = await aCreate.act({trx, dbService});
                const {dbService: createdService} = await aRead.act({trx, id});
                res = convService.db2dom({dbService: createdService});
                logger.info(`Service '${res.name}' created successfully (id:${createdService.id}).`);
                await trx.commit();
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error creating service: ${error.message}`);
                throw error;
            }
        };

        /**
         * Initializes the database with three sample services.
         */
        this.initDb = async function () {
            try {
                const dto1 = this.composeEntity();
                dto1.name = `Service 1`;
                dto1.description = `Description for Service 1`;
                await this.create({dto: dto1});

                const dto2 = this.composeEntity();
                dto2.name = `Service 2`;
                dto2.description = `Description for Service 2`;
                await this.create({dto: dto2});

                const dto3 = this.composeEntity();
                dto3.name = `Service 3`;
                dto3.description = `Description for Service 3`;
                await this.create({dto: dto3});

                logger.info(`Three services have been created in the RDB.`);
            } catch (error) {
                logger.error(`Error initializing services: ${error.message}`);
                throw error;
            }
        };

        /**
         * Lists all services.
         * @param {Object} [params]
         * @returns {Promise<Demo_Back_Dto_Service_Item.Dto[]>}
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
                logger.error(`Error listing services: ${error.message}`);
                throw error;
            }
        };

        /**
         * Reads service data by ID.
         * @param {Object} params - Parameters for reading the service.
         * @param {number} [params.id] - Service ID.
         * @returns {Promise<Demo_Back_Dto_Service.Dto>} - Service DTO or `null` if not found.
         */
        this.read = async function ({id}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbService} = await aRead.act({trx, id});
                await trx.commit();
                if (dbService) {
                    res = convService.db2dom({dbService});
                    logger.info(`Service '${res.name}' read successfully (id:${res.id}).`);
                } else {
                    logger.info(`Service with ID ${id} not found.`);
                }
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error reading service: ${error.message}`);
                throw error;
            }
        };
    }
}
