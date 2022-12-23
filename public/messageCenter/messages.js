const socket = io();

const messages = []

function getData(urlApi, data) {

    const response = fetch(urlApi, {
        method: 'POST', 
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response
}

const conectar = () =>{
    const mailID = document.getElementById('correo');
    const name = document.getElementById('nombre');
    const lastName = document.getElementById('apellido');
    const age = document.getElementById('edad');
    const nickname = document.getElementById('alias');

        let mailIDValue = mailID?.value || '';
        let nameValue = name?.value || '';
        let lastNameValue = lastName?.value || '';
        let ageValue = age?.value || '';
        let nicknameValue = nickname?.value || '';

        const dataUser = {
            mailIDValue,
            nameValue,
            lastNameValue,
            ageValue,
            nicknameValue
        }  

    getData(`http://localhost:3005/api/getMessagesFirebase`,dataUser)
    .then(response => response.json())
    .then((data) => {
        if(data.result.connected){
            document.getElementById("messagesChat").style.display = "flex";
            data.result.info.forEach(element => {
                //console.log(element.mapValue.fields.mensajes.mapValue.fields.mensajes.arrayValue.values)
                element.mapValue.fields.mensajes.mapValue.fields.mensajes.arrayValue.values.forEach(messages => {
                    console.log(messages.mapValue.fields.mensaje.stringValue)
                    
                });
            });
        }
        else{
            alert("cuenta inexistente")
        }
        socket.emit('NEW_MESSAGE_TO_SERVER', messageObj);
    })
}