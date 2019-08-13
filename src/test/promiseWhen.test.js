import promiseWhen from '../promiseWhen';

it('can test async', () => {
  expect.assertions(3);
  Promise.resolve().then(() =>{
    expect(2).toEqual(2)
  }).then(() =>{
    expect(2).toEqual(2)
  }).then(() =>{
    expect(1).toEqual(1)
  })
});

it('can test native Promise race', async () => {
  expect.assertions(1);
  let p1 = new Promise(resolve => {
    setTimeout(() => resolve("one"), 1);
  })

  let p2 = new Promise(resolve => {
    setTimeout(() => resolve("two"), 10);
  })
  
  await Promise.race([p1, p2])
  .then(value => expect(value).toEqual("one"))
});

it('can create a race function', async () => {
  expect.assertions(1);
  let p1 = new Promise(resolve => {
    setTimeout(() => resolve("one"), 1);
  })

  let p2 = new Promise(resolve => {
    setTimeout(() => resolve("two"), 2);
  })

  let race = eps => {
    if (eps.findIndex(ep => ep.isSettled()) >= 0){
      return [eps.findIndex(ep => ep.isSettled())]
    }
    return false
  }
  
  await promiseWhen([p1, p2], race)
  .then(eps => {
    expect(eps[0].value).toEqual("one")
  })
});

it('can create PromisesAreMostlyDone', () => {
  let promises = [
    fetch('https://picsum.photos/200/300?random=1', {mode: 'no-cors'}),
    fetch('https://picsum.photos/200/300?random=2', {mode: 'no-cors'}),
    fetch('https://picsum.photos/200/300?random=3', {mode: 'no-cors'}),
    fetch('https://picsum.photos/200/300?random=4', {mode: 'no-cors'}),
    fetch('https://picsum.photos/200/300?random=5', {mode: 'no-cors'})
  ]
  promiseWhen(promises, eps => {
    let completed = eps.filter(ep => ep.state !== "pending");
    if (eps.length / 2 <= completed.length){
      return eps.map(ep => ep.index)
    }
    return false
  })
  .then(()=> console.log("mostly done"))
  
  Promise.all(promises)
  .then(()=> console.log("all done"))
  
});
