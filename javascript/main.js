const pocOl = document.querySelector('#pocOl')
console.log(pocOl)
function pokemanFetch(){
  const promises = []
  for(let index = 1; index <= 150; index++){
    const url = `https://pokeapi.co/api/v2/pokemon/${index}`
    /*the empty array of promises, for one of the request we will push the the promises
    in to the list of promises*/
    promises.push(fetch(url)
          .then(res => res.json())); // parse response as JSON
  }
  /*we will let all individuls calls and get the trigger
  to all of the results*/
  Promise.all(promises).then(results =>{
    const pokemonObj = results.map((data)=>({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map(type =>type.type.name)
      .join(', ') /*getting the reference from
      each types and join them*/
    }))
    displyaPokmon(pokemonObj)
  })
}

const displyaPokmon = (pokemonObj) =>{
  console.log(pokemonObj)
  //transforming each object 
  const htmlSringPokeman = pokemonObj.map(pokman => `
  <li class="card">
      <img class="card-image" src="${pokman.image}"/>
      <h2 class="card-title">${pokman.id}. ${pokman.name}</h2>
      <p class="card-type">TYPE: ${pokman.type}</p>
  </li>
  `).join()
  pocOl.innerHTML = htmlSringPokeman;
}
pokemanFetch()

