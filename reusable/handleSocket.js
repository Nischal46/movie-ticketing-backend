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
    
    function reusableConnection(conn, socket){

        // console.log(conn, socket)
        socket.on('recordAction', function (data){
            const { action, user } = data;
        
            if (!userid.includes(user)) {
              userid.push(user);
            }
        
            if (!clientresponse[user]) {
              clientresponse[user] = []; // Initialize array for the user if it doesn't exist
            }
        
            clientresponse[user].push(action);
            clientresponse[user] = clientresponse[user][clientresponse[user].length - 1];
        
            const responseJSON = clientresponse;
        
            console.log(responseJSON);
        
            conn.emit('alert', responseJSON);
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
      reusableConnection(firstconnection, socket)
    });

    secondconnection.on("connection", (socket) => {
        reusableConnection(secondconnection, socket)
    });

    thirdconnection.on("connection", (socket) => {
        reusableConnection(thirdconnection, socket)
    });

    fourthconnection.on("connection", (socket) => {
        reusableConnection(fourthconnection, socket)
    });
}

module.exports = setupSocketConnectionServer;
