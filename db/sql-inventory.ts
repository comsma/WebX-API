import {Stock} from "../Interfaces/Inventory";
import {sqlCredentials} from "../creds"
const sql = require('mssql')
const sqlConfig = {
    user:     sqlCredentials.user,
    password: sqlCredentials.password,
    database: sqlCredentials.database,
    server:   sqlCredentials.server,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}


export class SQLInventory {

    async getStock(itemID: string): Promise<Stock> {
            try {
                await sql.connect(sqlConfig)
                const result = await sql.query`SELECT inv_mast.item_id, inv_loc.qty_on_hand FROM inv_mast
                                               INNER JOIN inv_loc on (inv_mast.inv_mast_uid = inv_loc.inv_mast_uid) WHERE item_id = ${itemID}`

                return result.recordset[0]
            } catch (err) {
                console.log(err)
            }


        // @ts-ignore
        return await query()
    }
    getPrice(customerID: string, itemID: string, quantity: number) {
        const query = async () => {
            try {

            } catch (err) {
                // ... error checks
            }
        }
    }
}