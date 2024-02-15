const {Server} = require('socket.io');

function setupSocketConnectionServer(server){

    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173"],
      
        }
      });
    
    
    let totaluser = 0;
    let clientresponse = {}
    let userid = []
    
    function reusableConnection(conn, socket, connectionNo){

        // console.log(conn, socket)
        socket.on('recordAction', function (data){
            const { action, user, date, time, movie } = data;
        
            if (!clientresponse[movie]) {
            // clientresponse[user] = {}; // Initialize array for the user if it doesn't exist
            clientresponse[movie] = []
            }

            clientresponse[movie] = {action, date, time, user}
        
            console.log('the response is', clientresponse);
        
            io.emit('alert', [{action, user, date, time, movie}]);
            // io.emit('alert', clientresponse);
          });
        
          socket.on('disconnect', () => {
            // Handle disconnection if needed
          });
    }

    const firstconnection = io.of('/connection1');
    const secondconnection = io.of('/connection2');
    const thirdconnection = io.of('/connection3');
    const fourthconnection = io.of('/connection4');
    
    
    firstconnection.on("connection", (socket) => {
      reusableConnection(firstconnection, socket, 'firstconnection')
    });

    secondconnection.on("connection", (socket) => {
        reusableConnection(secondconnection, socket, 'secondconnection')
    });

    thirdconnection.on("connection", (socket) => {
        reusableConnection(thirdconnection, socket, 'thirdconnection')
    });

    fourthconnection.on("connection", (socket) => {
        reusableConnection(fourthconnection, socket, 'fourthconnection')
    });
}

module.exports = setupSocketConnectionServer;


