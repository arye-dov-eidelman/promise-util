function promiseWhen(promises, shouldResolve) {
	return new Promise(resolve => {
		const eps = []

		for (let i = 0; i < promises.length; i++) {
			eps[i] = {promise: promises[i], state: "pending", value: null, index: i}

			promises[i].then(value => {
				eps[i].value = value
				eps[i].state = "fulfilled"
			})

			promises[i].catch(value => {
				eps[i].value = value
				eps[i].state = "rejected"
			})

			promises[i].finally(() => {
				let resolvingIndexes = shouldResolve(eps)
				if (Array.isArray(resolvingIndexes) && resolvingIndexes.length > 0) {
					resolve(eps.filter(ep => resolvingIndexes.includes(ep.index)))
				}
			})

		}
	})
}

export default promiseWhen;