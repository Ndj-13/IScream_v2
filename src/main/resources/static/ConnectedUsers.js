var userid;
var connectedUsers;

$(document).ready(function() {
    $.ajax({
        type: 'POST',
        url: `http://${ipAddress}:8080/User/connect`,
        success: function(response) {
            userid = response;
            console.log("Usuario " + userid + " conectado.");
        },
        error: function(xhr, status, error) {
            console.log("Error en el POST conectar Usuario");
            console.log(error);
        }
    });
    setInterval(obtenerUsuariosConectados, 100); 
});

function obtenerUsuariosConectados() {
    $.ajax({
        url: `http://${ipAddress}:8080/User/aliveUsers`,
        type: 'GET',
        data: {userId : userid},
        success: function(data) {
            $('#connectedUsersCount').text('Usuarios conectados: ' + data);
            connectedUsers=data;
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener el número de usuarios conectados: ', error);
        }
    });
}



