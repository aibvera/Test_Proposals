window.addEventListener("load", async() => {
    await initialLoad();
});

const initialLoad = async() => {
    await propuestas();
};

const propuestas = async() => {
    try {
        const response = await fetch('/proposals')
        const data = await response.json()
        
        // Aquí va el programa
        //

        console.log(data)
        ejemplo.innerHTML = 'Hola';

        //
        // Aquí termina el programa

    } catch (error) {
        console.log(error)
    }
};
