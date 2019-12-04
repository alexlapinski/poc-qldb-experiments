import * as R from 'ramda';
import database, { closeSession } from './database';
import { log, error, success } from './logging';
import { TransactionExecutor, Result, QldbSession } from 'amazon-qldb-driver-nodejs';
import { getLedgerName } from './settings';

const createTable = (executor: TransactionExecutor, tableName: string): Promise<Result> =>
    executor.executeInline(`CREATE TABLE ${tableName}`);

const createTables = (session: QldbSession, tableNames: string[]) => 
    session.executeLambda(
        async (txn) => Promise.all(R.map(R.partial(createTable, [txn]), tableNames)),
        () => log('Retruing due to OCC conflict...')
    );

const main = async (ledgerName: string) => {
    const driver = database.getDriver(ledgerName);
    const session = await database.getSession(driver);

    try {
        await createTables(
            session, 
            [
                'VehicleRegistration',
                'Vehicle',
                'Person',
                'DriversLicense',
            ]
        );
    } finally {
        database.closeSession(session);
    }

};

if (require.main === module) {
    main(getLedgerName())
        .then(() => success('# Seed Complete'))
        .catch(err => error('Error Seeding Ledger', err));
}