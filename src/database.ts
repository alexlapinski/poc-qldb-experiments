import { PooledQldbDriver, QldbSession } from 'amazon-qldb-driver-nodejs';

const testServiceConfigOptions = {
    region: 'us-east-1',
};

export const getDriver = (ledgerName: string = 'testLedger'): PooledQldbDriver =>
    new PooledQldbDriver(ledgerName, testServiceConfigOptions);

export const getSession = async (driver: PooledQldbDriver): Promise<QldbSession> =>
    await driver.getSession();

export const closeSession = (session: QldbSession): void => 
    session !== null && session !== undefined 
        ? session.close()
        : void null;

export default {
    getDriver,
    getSession,
    closeSession,
};