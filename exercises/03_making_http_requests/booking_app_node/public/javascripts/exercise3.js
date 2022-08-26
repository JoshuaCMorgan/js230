
function formDataToJSON(data) {
  const json = {}
  for (const [key, value] of data) {
    json[key] = value;
  }
  return JSON.stringify(json);
}
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(form);
    let jsonData = formDataToJSON(formData)
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(jsonData)
    
    //API docs states that it checks for email and name.  it sends  with 400 error response returns string message.
    // API docs sends with response status of 201 a json object with id of staff member
    xhr.addEventListener('load', (event) => {
      switch(xhr.status) {
        case 201:
            const data = JSON.parse(xhr.response);
            alert(`Successfully created staff with id: ${data.id}`);
            form.reset();
            break;
        case 400:
            alert(xhr.responseText);
      }
    });
  });
})