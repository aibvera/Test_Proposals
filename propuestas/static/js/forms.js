window.addEventListener("load", async() => {
    await formulario();
});

const formulario = async() => {
    submit.addEventListener("click", (event) => {
        formulario_test();
    })

}

function getCSRFToken(){
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

const formulario_test = async() => {
    try {
        const response = await fetch('/proposals')
        const data = await response.json()

        // Aqui va el código

        var request = new XMLHttpRequest();
        var url = "submit";
        request.open("POST", url, true);
        var csrfToken = getCSRFToken();
        request.setRequestHeader("X-CSRFToken", csrfToken);
        console.log(csrfToken)
        request.onreadystatechange = function(){
            
            if(request.readyState === 4 && request.status === 200){
                var jsonData = JSON.parse(request.response);
                console.log(jsonData);
            }else{
                console.log("Solicitud fallida");
            }
        };

        var v1 = area.value;
        var v2 = categ.value;
        var v3 = proy.value;
        var v4 = desc.value;
        var v5 = enca.value;
        var v6 = corr.value;

        var data1 = JSON.stringify({
            "Area": v1,
            "Categoria": v2,
            "Proyecto": v3,
            "Descripcion": v4,
            "Encargado": v5,
            "Correo": v6
        });

        request.send(data1)

        
        console.log(data1)
        
        // Fin del código

    } catch (error){
        console.log(error)
    }
};