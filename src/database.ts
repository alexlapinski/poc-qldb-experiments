import { QLDB } from 'aws-sdk';
import { PooledQldbDriver, QldbSession } from 'amazon-qldb-driver-nodejs';
import { ClientConfiguration } from 'aws-sdk/clients/qldbsession';
import { CreateLedgerResponse, DescribeLedgerResponse } from 'aws-sdk/clients/qldb';
import { getAwsConfig } from './settings';

export const getClient = () => 
    new QLDB({ region: getAwsConfig().region });

export const createLedger = (client: QLDB, ledgerName: string): Promise<CreateLedgerResponse> =>
    client.createLedger({
        Name: ledgerName,
        PermissionsMode: 'ALLOW_ALL',
    }).promise();

export const describeLedger = (client: QLDB, ledgerName: string): Promise<DescribeLedgerResponse> =>
    client.describeLedger({ Name: ledgerName }).promise();

export const getDriver = (ledgerName: string): PooledQldbDriver =>
    new PooledQldbDriver(ledgerName, { region: getAwsConfig().region});

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