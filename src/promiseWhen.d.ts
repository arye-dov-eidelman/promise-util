type promiseState = "pending" | "fulfilled" | "rejected"

type shouldResolve = (promiseStates: promiseState[]) => Boolean

function promiseWhen(promises: Promises<any>[], shouldResolve: shouldResolve): Promise<any>

export default promiseWhen;