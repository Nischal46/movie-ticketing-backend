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
            const { action, user, date, time } = data;
        
            if (!userid.includes(user)) {
              userid.push(user);
            }
        
            if (!clientresponse[user]) {
            // clientresponse[user] = {}; // Initialize array for the user if it doesn't exist
            clientresponse[user] = []
            }

            // if (!clientresponse[user][connectionNo]) {
            //     clientresponse[user][connectionNo] = [];
            // }
            

            // clientresponse[user][connectionNo].push({action, connectionNo})
        
            clientresponse[user].push({action, connectionNo, date, time});
            // clientresponse[user] = clientresponse[user][clientresponse[user].length - 1];
        
            const responseJSON = clientresponse;
        
            console.log('the response is', clientresponse);
        
            io.emit('alert', clientresponse);
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


// const { Server } = require('socket.io');

// function setupSocketConnectionServer(server) {
//     // Create a new instance of Socket.IO Server
//     const io = new Server(server, {
//         cors: {
//             origin: ["http://localhost:5173"],
//         }
//     });

//     // Object to store client responses for each user
//     let clientResponses = {};

//     // Function to handle socket connection and incoming events
//     function handleConnection(namespace, socket, namespaceName) {
//         socket.on('recordAction', function (data) {
//             const { action, user } = data;

//             // Initialize user's response array if it doesn't exist
//             // if (!clientResponses[user] && clientResponses[user].includes(namespaceName)) {
//             //     clientResponses[user] = [];
//             // }

//                    // Initialize user's response object if it doesn't exist
//                    if (!clientResponses[user]) {
//                     clientResponses[user] = {};
//                 }
    
//                 // Initialize namespace object if it doesn't exist for the user
//                 if (!clientResponses[user][namespaceName]) {
//                     clientResponses[user][namespaceName] = [];
//                 }

//             // Add the action to the user's response array
//             // clientResponses[user].push({ namespace: namespaceName, action });
//             clientResponses[user][namespaceName].push(action);

//             console.log(clientResponses);
//             // console.log(clientResponses);

//             // Emit the response JSON to the client
//             socket.emit('alert', clientResponses);
//         });

//         socket.on('disconnect', () => {
//             // Handle disconnection if needed
//         });
//     }

//     // Define namespaces
//     const namespaces = [
//         { name: '/connection1', alias: 'firstconnection' },
//         { name: '/connection2', alias: 'secondconnection' },
//         { name: '/connection3', alias: 'thirdconnection' },
//         { name: '/connection4', alias: 'fourthconnection' }
//     ];

//     // Loop through namespaces and set up connections
//     namespaces.forEach(({ name, alias }) => {
//         const namespace = io.of(name);
//         namespace.on("connection", (socket) => {
//             handleConnection(namespace, socket, alias);
//         });
//     });
// }

// module.exports = setupSocketConnectionServer;
