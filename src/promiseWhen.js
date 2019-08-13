import ExposedPromise from "./ExposedPromise";

function promiseWhen(promises, shouldResolve) {
	return new Promise(resolve => {
		const stateChangedCB = () => {
			const resolvingIndexes = shouldResolve(eps)
			if (Array.isArray(resolvingIndexes) && resolvingIndexes.length > 0) {
				resolve(eps.filter((ep, i) => resolvingIndexes.includes(i)))
			}
		}
		const eps = promises.map(promise => new ExposedPromise(promise, stateChangedCB));
	})
}

export default promiseWhen;