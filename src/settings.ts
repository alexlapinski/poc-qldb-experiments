if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

export const getLedgerName = () =>
    process.env.LEDGER_NAME || 'test-ledger';

export const getAwsConfig = () => ({
    region: process.env.AWS_REGION || 'us-east-1',
});