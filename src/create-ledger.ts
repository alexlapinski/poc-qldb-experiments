import { QLDB } from 'aws-sdk';
import database, { createLedger, describeLedger, getClient } from './database';
import { log, success, error } from './logging';
import { getLedgerName } from './settings';
import { DescribeLedgerResponse } from 'aws-sdk/clients/qldb';
import { sleep } from './util';

export const waitForActive = async (client: QLDB, ledgerName: string, pollDurationInMs: number = 10000): Promise<DescribeLedgerResponse> => {
    log('Waiting for ledger to be active');
    while(true) {
        const result = await describeLedger(client, ledgerName);
        if (result.State === 'ACTIVE') {
            return result;
        }
        log(`Ledger isn\'t active yet sleeping for ${pollDurationInMs/1000}seconds`);
        await sleep(pollDurationInMs);
        log('Checking to see if ledger is active');
    }
};

export const main = async (ledgerName: string) => {
    const client = getClient();
    log('Creating Ledger');
    await createLedger(client, ledgerName);
    success('Ledger created successfully');

    log('Waiting for ledger to be active');
    await waitForActive(client, ledgerName);
    success('Ledger is active!');
};

if (require.main === module) {
    main(getLedgerName())
        .then(() => success('Done'))
        .catch((err) => error('error creating ledger', err));
}