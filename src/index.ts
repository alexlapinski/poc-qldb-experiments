import database from "./database";
import { log, error, success } from './logging';
import { getLedgerName } from "./settings";


const main = async (ledgerName: string) => {
    const driver = database.getDriver(ledgerName);
    const session = await database.getSession(driver);

    log(`# Table Names in the Ledger: '${ledgerName}'`);
    for( const table of await session.getTableNames()) {
        log(table);
    }

    database.closeSession(session);
};

if (require.main === module) {

    main(getLedgerName())
        .then(() => success('Done'))
        .catch(error => error('Error', error));
}