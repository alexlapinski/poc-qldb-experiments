import database from "./database";
import { log, error, success } from './logging';


const main = async () => {
    const ledger: string = 'vehicle-registration'
    const driver = database.getDriver(ledger);
    const session = await database.getSession(driver);

    log(`# Table Names in the Ledger: '${ledger}'`);
    for( const table of await session.getTableNames()) {
        log(table);
    }

    database.closeSession(session);
};

if (require.main === module) {
    main()
        .then(() => success('Done'))
        .catch(error => error('Error', error));
}