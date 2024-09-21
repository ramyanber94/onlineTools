// Purpose: Mapping class to create relationships between models.

import { sequelize } from "./db";


export default class Mapping {

    constructor() {
        (async () => {
            const tableCreated = await sequelize.getQueryInterface().showAllTables();
            if (tableCreated.length === 0) {
                await sequelize.sync();
            }

            const tableNames = tableCreated.map((table: any) => table.name);
            console.log(tableNames);
        })();

        this.init();
    }


    init() {
        // Define relationships

    }
}