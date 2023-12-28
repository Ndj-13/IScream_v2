function sendDataToServer(namebar, password, errorSpan, callback) {
    var name = $(namebar).val();
    var pass = $(password).val();
    $.ajax({
        method: "POST",
        url: `http://${ipAddress}:8080/User`/*"http://127.0.0.1:8080/User"*/,
        data: JSON.stringify({ name: name, password: pass }),
        processData: false,
        contentType: "application/json",
        success: function(data, textStatus, jqXHR) {
            console.log(textStatus + " " + jqXHR.status);
            console.log(data);
            //console.log(response);
            // Limpiar y ocultar el mensaje de error
            $(errorSpan).text('').css('visibility', 'hidden');
            if (callback) callback(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + " " + jqXHR.status);
            // Mostrar mensaje de error en rojo debajo del input de contraseña
            $(errorSpan).text("Password doesn't match or user doesn't exist.").css("color", "red").css("visibility", "visible").setX(400);
        }
    });
}/*function sendDataToServer(namebar, password, errorSpan) {
    var name = $(namebar).val();
    var pass = $(password).val();
    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:8080/User",
        data: JSON.stringify({ name: name, password: pass }),
        processData: false,
        contentType: "application/json",
        success: function(data, textStatus, jqXHR) {
            console.log(textStatus + " " + jqXHR.status);
            console.log(data);
            // Manejar la respuesta según el mensaje devuelto por el servidor
            if (data.includes("matches")) {
                // Mostrar mensaje de error en rojo debajo del input de contraseña
                $(errorSpan).text(data).css("color", "red").css("visibility", "visible");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + " " + jqXHR.status);
            // Mostrar mensaje de error en rojo debajo del input de contraseña
            $(errorSpan).text("Password doesn't match or user doesn't exist.").css("color", "red").css("visibility", "visible");
        }
    });
}*/
