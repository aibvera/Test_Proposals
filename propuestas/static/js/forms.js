window.addEventListener("load", async() => {
    await formulario();
});

const formulario = async() => {
    // Funcion para que la caja de descripción sea dinamica de acuerdo a la cantidad de texto introducido
    descripcion_dinamic();

    // Opciones que se envían al HTML
    options_area();
    options_categoria();

    // Validación para enviar una registro nuevo
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

    } catch (error){
        console.log(error)
    }
};

const descripcion_dinamic = async() => {
    try{
        const textarea = document.getElementById('desc');

        textarea.addEventListener('input', function() {
            this.style.height = 'auto'; // Resetea la altura
            this.style.height = (this.scrollHeight) + 'px'; // Ajusta según el contenido
        });
    } catch(error){
        console.log(error)
    }
}

const options_area = async() => {
    try{
        const response = await fetch('../areachoices/');
        const data_area = await response.json();
        const selectArea = document.getElementById('area');
        
        cantidad = Object.values(data_area).length;
        for(var i=0; i<cantidad; i++){
            const option = document.createElement('option');
            option.value = data_area.opciones[i][0];
            option.textContent = data_area.opciones[i][1];
            selectArea.appendChild(option);
        };
    } catch(error){
        console.log(error)
    }
}

const options_categoria = async() => {
    try{
        const response = await fetch('../catechoices/');
        const data_cate = await response.json();
        const selectCate = document.getElementById('categ');

        cantidad = Object.values(data_cate.opciones).length;
        for(var i=0; i<cantidad; i++){
            const option = document.createElement('option');
            option.value = data_cate.opciones[i][0];
            option.textContent = data_cate.opciones[i][1];
            selectCate.appendChild(option);
        }
    } catch(error){
        console.log(error)
    }
}