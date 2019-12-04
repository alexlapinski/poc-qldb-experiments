import database, { closeSession } from './database';
import { log, error, success } from './logging';
import { TransactionExecutor, Result } from 'amazon-qldb-driver-nodejs';

const createTable = (executor: TransactionExecutor, tableName: string): Promise<Result> =>
    executor.executeInline(`CREATE TABLE ${tableName}`);
;
const main = async () => {
    const ledger = process.env.LEDGER_NAME || 'vehicle-registration';
    const driver = database.getDriver(ledger);
    const session = await database.getSession(driver);

    try {
        await session.executeLambda(async (txn) =>
            Promise.all([
                createTable(txn, 'VehicleRegistration'),
                createTable(txn, 'Vehicle'),
                createTable(txn, 'Person'),
                createTable(txn, 'DriversLicense'),
            ]), 
            () => log('Retruing due to OCC conflict...')
        );
    } catch(error) {
        error('Error creating tables', error);
    } finally {
        database.closeSession(session);
    }

};

if (require.main === module) {
    main()
        .then(() => success('# Seed Complete'))
        .catch(error => error('Error Seeding Ledger', error));
}