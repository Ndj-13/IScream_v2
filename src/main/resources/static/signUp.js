$(document).ready(function(){
    console.log("El DOM está cargado");
    
    $("#nameInput").on("input", function() {
    // Ocultar el mensaje de error cuando se comience a escribir en el campo del nombre
    $("#errorMessage").hide();
    });

    $("form").submit(function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Obtener los valores de los campos
        var name = $("#nameInput").val();
        var password = $("#passwordInput").val();
        // Realizar la petición AJAX al servidor de Spring Boot
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:8080/User", 
            data: JSON.stringify({ name: name, password: password }), // Enviar los datos del formulario
            processData: false,
            contentType: "application/json", 
            success: function(data, textStatus, jqXHR) {
                console.log(textStatus + " " + jqXHR.status);
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " " + jqXHR.status);
                
                $("#errorMessage").show();
            }
        });
    });
});
