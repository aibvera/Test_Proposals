window.addEventListener("load", async() => {
    await formulario();
});

const formulario = async() => {
    const textarea = document.getElementById('desc');

    textarea.addEventListener('input', function() {
    this.style.height = 'auto'; // Resetea la altura
    this.style.height = (this.scrollHeight) + 'px'; // Ajusta según el contenido
    });

    submit.addEventListener("click", (event) => {
        if (validarCampos()) {
            formulario_test();
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });

}

function getCSRFToken(){
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

const validarCampos = () => {
    // Verifica que todos los campos tengan valor
    return area.value.trim() !== '' &&
        categ.value.trim() !== '' &&
        proy.value.trim() !== '' &&
        desc.value.trim() !== '' &&
        enca.value.trim() !== '' &&
        corr.value.trim() !== '';
};

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
        
        request.onreadystatechange = function(){
            if(request.readyState === 4){
                if(request.status === 200){
                    var jsonData = JSON.parse(request.response);
                    console.log(jsonData);

                    // Limpiar los campos del formulario
                    area.value = '';
                    categ.value = '';
                    proy.value = '';
                    desc.value = '';
                    enca.value = '';
                    corr.value = '';

                }else{
                    console.log('Solicitud fallida!')
                }
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
        console.log(data.propuestas[0])
        console.log(data1)

        // Fin del código

    } catch (error){
        console.log(error)
    }
};