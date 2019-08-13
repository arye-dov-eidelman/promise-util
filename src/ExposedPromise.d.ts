export default class ExposedPromise<T> {
	promise: Promise<T>
	state: "pending" | "fulfilled" | "rejected"
	value: any
	stateChangedCB: function | undefined

	constructor(promise: Promise<T>, stateChangedCB?: function)

	isFulfilled() :boolean
	isNotFulfilled() :boolean
	isRejected() :boolean
	isNotRejected() :boolean
	isPending():boolean
	isSettled() :boolean
}
