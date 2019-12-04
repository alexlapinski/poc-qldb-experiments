# QLDB Experimentation

## Local Setup
1. Make sure your local AWS config & credentials are setup.
2. Clone this repo
3. Install NPM Dependencies
    ```
    npm install
    ```
4. Set ENV Variables (or use a ```.env``` file, rename ```.env.sample``` -> ```.env```)
    ```sh
    export LEDGER_NAME=test
    export AWS_REGION=us-east-1
    ```

## Ledger Experimentation
5. Create the Ledger
    ```
    npm run create
    ```
6. Seed / Migrate the ledger
    ```
    npm run seed
    ```
7. Run the main test script to experiment
    ```
    npm start
    ```