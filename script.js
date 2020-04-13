const bring = document.getElementById('input-bring')
const azar = document.getElementById('azar')
const containerImage = document.getElementById('container-image')
const btnSubmit = document.getElementById("btn-submit")


//ESCRIBIR TEXTO EL EL CONTAINERIMAGE SI OCURRE UN ERROR

const writedText = text => {
    containerImage.insertAdjacentHTML('beforeend', `<p class="text" id="text"> ${text} </p>`)
}



//ELIMINAR ELEMENTOS

const deleteElem = (id) => {
    elem = document.getElementById(id);
    if(elem) {
        padre = elem.parentNode;
        padre.removeChild(elem);
    }
} 



//TRAER POKEMONS POR SU NOMBRE

const cargarPokemon = async () => {
    const getValueName = bring.value;
    bring.value = '';

    const url = `https://pokeapi.co/api/v2/pokemon/${getValueName}/`
    const answer = await fetch(url)
    switch (answer.status) {
        case 200:
            const result = await answer.json()
            //console.log(result.sprites.front_default)
            showPokemon(result)
            
            break;
        case 304:
            writedText(answer.status + ' Tu repuesta no ha sido modificada')
            break;
        case 404:
            writedText(answer.status + ' No pudimos encontrar tu solicitud :(')
            break;
        case 500:
            writedText(answer.status + ' Hay un problema con el servidor')
        default:
            writedText(answer.status + ' No pudimos encontrar el error')
            break;
    }
}

const showPokemon = (data) => {

    const drawHtml = `
    <div class="content-image" id="content-image">
    <h2 class="name"> ${data.name} </h2>
    <img src="${data.sprites.front_default}" class="image-pokemon">
    </div>
    `
  
    containerImage.insertAdjacentHTML('beforeend', drawHtml)

}

btnSubmit.addEventListener('click', () => {

    deleteElem("content-image")
    deleteElem("text")
    cargarPokemon()
       
})


 