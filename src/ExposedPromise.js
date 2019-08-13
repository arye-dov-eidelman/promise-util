export default class ExposedPromise {
	constructor(promise, stateChangedCB) {
		this.promise = promise
		this.state = "pending"
		this.stateChangedCB = stateChangedCB

		promise.then(value => {
			this.value = value
			this.state = "fulfilled"
		})

		promise.catch(value => {
			this.value = value
			this.state = "rejected"
		})

		this.promise.finally(() =>{
			this.stateChangedCB && this.stateChangedCB()
		})
	}
	isFulfilled()    { return this.state === "fulfilled" }
	isNotFulfilled() { return this.state !== "fulfilled" }
	isRejected()     { return this.state === "rejected" }
	isNotRejected()  { return this.state !== "rejected" }
	isPending()      { return this.state === "pending" }
	isSettled()      { return this.state !== "pending" }
}