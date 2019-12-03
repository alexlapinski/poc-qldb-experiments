import database from "./database";


const main = async () => {
    const ledger: string = 'vehicle-registration'
    const driver = database.getDriver(ledger);
    const session = await database.getSession(driver);

    console.log(`# Table Names in the Ledger: '${ledger}'`);
    for( const table of await session.getTableNames()) {
        console.log(table);
    }

    database.closeSession(session);
};

if (require.main === module) {
    main()
        .then(() => console.log('Done'))
        .catch(error => console.error(`Error: ${error?error.message:'Unknown'}`));
}