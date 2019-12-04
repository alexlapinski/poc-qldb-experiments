export const sleep = (timeoutInMs: number): Promise<void> =>
    new Promise((resolve, reject) =>
        setTimeout(resolve, timeoutInMs)
    );