require('dotenv').config({path: '../../.env'})

const getSolicitudByEmail  = async (token) => {

  var myHeaders = new Headers();
  myHeaders.append("jwt",token);
  myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      mode:'cors'
    };    
    
    let response = await fetch("http://localhost:8080/api/solicitudes/"+ "gaston.alejandro.gmz@gmail.com", requestOptions);
    let jsonData  = await response.json(); 

    //setSolicitudes(response);
    console.log(jsonData)
    return jsonData;  

}

const crearSolicitud= async (name, surname, usuarioPorfolio,  empresa, phone, email, message) => {

  var myHeaders = new Headers();  
  myHeaders.append("Content-Type", "application/json");      
    
  var raw = JSON.stringify({
    "empresa": empresa,
    "usuarioPorfolio": usuarioPorfolio,
    "nombre": name,
    "apellido": surname,
    "email": email,
    "telefono": phone,
    "mensaje": message,
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  await fetch("http://localhost:8080/api/solicitudes", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}


const borrarSolicitud = async (token, id) => {
  var myHeaders = new Headers();
  myHeaders.append("jwt",token);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "id": id,    
  });
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  await fetch("http://localhost:8080/api/solicitudes/"+id, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  
}


export { getSolicitudByEmail, crearSolicitud, borrarSolicitud};
