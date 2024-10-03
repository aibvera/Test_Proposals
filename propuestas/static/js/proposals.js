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

        // Aqui va el código
        let valores = []
        let valores_rec = []
        head = Object.keys(data.propuestas[0])
        // anchos específicos para las columnas
        let columnas = head.map((col, index) => {
            let width;

            if(col === 'Proyecto'){
                width = '300px';
            }

            return{
                name: col,
                width: width
            };
        });

        valores = Object.values(data.propuestas)
        for(var i=0; i < valores.length; i++){
            valores_rec.push(Object.values(valores[i]))
        }

        $("div#wrapper").Grid({
            search: true,
            pagination: {
                limit: 8
            },
            sort: true,
            columns: columnas,
            data: valores_rec,
            style:{
                th:{
                    color:'black'
                },
            },
            language:{
                'search':{
                    'placeholder':'🔍 Busca lo que quieras...',
                }
            },
            width: '99%',
            resizable: true,
        });

        // Fin del código

    } catch (error){
        console.log(error)
    }
};
