window.addEventListener("load", async() => {
    await initialLoad();
    await initialLoad_1();
    // await formulario();
});

const initialLoad = async() => {
    await propuestas();
};

const initialLoad_1 = async() => {
    await propuestas_1();
}

// const formulario = async() => {
//     await formulario_test();
// }

// function getCSRFToken(){
//     return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
// }

// const formulario_test = async() => {
//     try {
//         const response = await fetch('/proposals')
//         const data = await response.json()

//         // Aqui va el código

//         var request = new XMLHttpRequest();
//         var url = "submit";
//         request.open("POST", url, true);
//         var csrfToken = getCSRFToken();
//         request.setRequestHeader("X-CSRTFToken", csrfToken);
//         request.onreadystatechange = function(){
//             if(request.readyState === 4 && request.status === 200){
//                 var jsonData = JSON.parse(request.response);
//                 console.log(jsonData);
//             }
//         }


        
//         // Fin del código

//     } catch (error){
//         console.log(error)
//     }
// };

const propuestas_1 = async() => {
    try {
        const response = await fetch('/proposals')
        const data = await response.json()

        // Aqui va el código

        console.log(data)

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
        for(var i=0; i < 17; i++){
            valores_rec.push(Object.values(valores[i]))
        }
        // console.log(valores_rec)
        
        // console.log(head)
        

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

