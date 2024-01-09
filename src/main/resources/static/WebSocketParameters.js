var connection;
function createWebSocketConnection(){
    console.log(ipAddress);
    connection = new WebSocket(`ws://${ipAddress}:8080/echo`);
    connection.onopen = () => {
        connection.send('Conexión WS desde un usuario diferente');
        console.log("Conexión creada con mi hermanito webSocket");
    }
    /*connection.onmessage = function(msg) {
        console.log("WS mensaje recibido: " + msg.data);
    }*/
    connection.onclose = (event) => {
        if (event.wasClean) {
            console.log(`La conexión cerrada correctamente. Código: ${event.code} | Razón: ${event.reason}`);
        } else {
            console.error('La conexión WS se cerró de manera inesperada');
        }
    };
    connection.onerror = (error) => {
        console.error('Error en la conexión WebSocket:', error);
    };
}