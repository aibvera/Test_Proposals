window.addEventListener("load", async() => {
    await initialLoad();
    await initialLoad_1();
});

const initialLoad = async() => {
    await propuestas();
};

const initialLoad_1 = async() => {
    await propuestas_1();
}

const propuestas_1 = async() => {
    try {
        const response = await fetch('/proposals')
        const data = await response.json()

        // Aqui va el código

        console.log(data)

        let valores = []
        let valores_rec = []
        head = Object.keys(data.propuestas[0])
        valores = Object.values(data.propuestas)
        for(var i=0; i < 17; i++){
            valores_rec.push(Object.values(valores[i]))
        }
        console.log(valores_rec)
        
        console.log(head)
        

        $("div#wrapper").Grid({
            search: true,
            pagination: {
                limit: 8
            },
            sort: true,
            columns: head,
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
        });

        // Fin del código

    } catch (error){
        console.log(error)
    }
};

const propuestas = async() => {
    try {
        const response = await fetch('/proposals')
        const data = await response.json()
        
        // Aquí va el programa
        //
        //console.log(data)

        let crearTabla = function(lista){
            let stringTabla = "<tr><th>Area</th><th>Categoria</th><th>Correo</th><th>Encargado</th><th>Propuesta</th><th>Proyecto</th></tr>"
            for(let data of lista){
                let fila = "<tr><td>"
                fila += data.Area;
                fila += "</td>"

                fila += "<td>"
                fila += data.Categoria;
                fila += "</td>"

                fila += "<td>"
                fila += data.Correo;
                fila += "</td>"

                fila += "<td>"
                fila += data.Encargado;
                fila += "</td>"

                fila += "<td>"
                fila += data.Id_Propuesta;
                fila += "</td>"

                fila += "<td>"
                fila += data.Proyecto;
                fila += "</td>"

                fila += "</tr>";
                stringTabla += fila;
            }
            return stringTabla;
        };
        //console.log(crearTabla(data.propuestas))
        // Comentado porque se esta trabajando en otra funcion v2
        //document.getElementById("MiTabla1").innerHTML = crearTabla(data.propuestas);
        
        //
        // Aquí termina el programa

    } catch (error) {
        console.log(error)
    }
}