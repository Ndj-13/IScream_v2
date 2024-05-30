var userid;

$(document).ready(function() {
    $.ajax({
        type: 'POST',
        url: `http://${ipAddress}:8080/User/connect`,
        success: function(response) {
            userid = response;
            console.log("Usuario conectado");
        },
        error: function(xhr, status, error) {
            console.log("Error en el POST conectar Usuario");
            console.log(error);
        }
    });
    setInterval(getAliveUsersCount, 100); 
    //setInterval(getLoggedUsersCount, 100);
});

function getAliveUsersCount() {
    $.ajax({
        url: `http://${ipAddress}:8080/User/aliveUsers`,
        type: 'GET',
        data: {userId : userid},
        success: function(data) {
            $('#connectedUsersCount').text('Connected Users: ' + data);
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener el número de usuarios conectados:', error);
        }
    });
}

function getLoggedUsersCount() {
    $.ajax({
        method: "GET",
        url: `http://${ipAddress}:8080/UsersCount`,
        dataType: 'json'
    }).done(function(data) {
        loggedUsersCount = data;
    })
}

