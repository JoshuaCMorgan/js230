
const DOMAIN = 'http://localhost:3000';

function fetchSchedules(method, url) {
  let request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open('GET', DOMAIN + url);
    request.timeout = 5000;
    request.responseType = 'json';

    request.addEventListener('load', event => {
      const schedules = request.response;
      if (schedules.length === 0) {
        reject('There are currently no schedules available for booking');
      } else {
        let openSchedules = schedules.filter(({student_email}) => student_email === null);
        resolve(openSchedules);
      }
    })

    request.addEventListener('timeout', event => {
      reject('It is taking longer than usual, please try again later.')
    });
    request.send();
  });
};

function insertSchedules(schedules) {
  console.log(schedules);
  let select = document.querySelector('select');
  let availableSchedules = schedules.filter(({student_email}) => student_email === null);
 
  const option = document.createElement('option');
  option.setAttribute('value', id);
  option.textContent = `${id} ${date}`
  select.appendChild(option);
}

function fetchStaff(method, url) {
  let xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.open(method, DOMAIN + url);
    xhr.responseType = 'json';
    xhr.send();

    xhr.addEventListener('load', event => {
      resolve(xhr.response);
    })

  })
}

function insertSelectOption(data) {
  data.forEach(({id, name, date, time}) => {
    const select = document.querySelector('select');
    const option = document.createElement('option');
    option.setAttribute('value', id);
    option.textContent = `${name} | ${date} | ${time}`;
    select.appendChild(option);
});
}
document.addEventListener('DOMContentLoaded', (event) => {
  const scr = [
    fetchStaff('GET', '/api/staff_members'),
    fetchSchedules('GET','/api/schedules'),
  ];
  let staffSchedules = [];
  Promise.all(scr).then((result) => {
    console.log(result)
    let staff = result[0];
    let schedules = result[1];
    

    schedules.forEach((schedule) => {
      let staffName = staff.find(({id}) => {
        return schedule.staff_id === id;
      }).name

      staffSchedules.push({
        id: schedule.id,
        name: staffName, 
       date: schedule.date, 
       time: schedule.time
      })
    })
    
    insertSelectOption(staffSchedules);
  }).catch((error) => {
    console.log(error)
  })
  
  let form = document.querySelector('form');

  function formDataToJSON(formData) {
    const obj = {}
    for (const [key, value] of formData.entries()) {
      obj[key] = value;
    }
    
    return obj;
  }

  function studentTemplate(data) {
    const newStudentForm = document.createElement('form');
    newStudentForm.setAttribute('method', 'post');
    newStudentForm.setAttribute('action', '/api/students')
    newStudentForm.setAttribute('id', 'newStudentForm');
    const h1 = document.createElement('h1');
    h1.innerText = 'Please provide new student detail';
    newStudentForm.appendChild(h1);

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    emailLabel.setAttribute('for', 'email');
    newStudentForm.appendChild(emailLabel);

    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('id', 'email');
    emailInput.setAttribute('value', data.email);
    newStudentForm.appendChild(emailInput);
    newStudentForm.appendChild(document.createElement('br'));

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    nameLabel.setAttribute('for', 'name');
    newStudentForm.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('id', 'name');
    newStudentForm.appendChild(nameInput);
    newStudentForm.appendChild(document.createElement('br'));

    const bookingSequenceLabel = document.createElement('label');
    bookingSequenceLabel.textContent = 'Booking Sequence:';
    bookingSequenceLabel.setAttribute('for', 'booking_sequence');
    newStudentForm.appendChild(bookingSequenceLabel);

    const bookingSequenceInput = document.createElement('input');
    bookingSequenceInput.setAttribute('type', 'text');
    bookingSequenceInput.setAttribute('name', 'booking_sequence');
    bookingSequenceInput.setAttribute('id', 'booking_sequence');
    bookingSequenceInput.setAttribute('value', data.bookingSequence);
    newStudentForm.appendChild(bookingSequenceInput);
    newStudentForm.appendChild(document.createElement('br'));

    const submitInput = document.createElement('input');
    submitInput.setAttribute('type', 'submit');
    newStudentForm.appendChild(submitInput);
    document.querySelector('body').appendChild(newStudentForm);
  }

  function createNewStudent(response) {
    let bookingSequence = response.split(':')[1].trim()
    studentTemplate({email: form['student_email'].value, bookingSequence})
   
    const newStudentForm = document.querySelector('#newStudentForm')
    newStudentForm.addEventListener('submit', event => {
      event.preventDefault()
      let xhr2 = new XMLHttpRequest();
      const formData2 = new FormData(newStudentForm);
      const json2 = JSON.stringify(formDataToJSON(formData2));
      xhr2.open('POST', 'api/students');
      xhr2.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr2.send(json2);
      console.log(json2)
      xhr2.addEventListener('load', event => {
        if (xhr2.status === 201) {
            newStudentForm.reset();
            formData.set('student_email', formData2.get('email'));
            form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      })
    })

  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(form);
    let jsonData = JSON.stringify(formDataToJSON(formData));
    console.log(jsonData)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(jsonData);

    xhr.addEventListener('load', (event) => {

      if(xhr.status === 404) {
        alert(xhr.responseText);
        createNewStudent(xhr.responseText, formData)
      } else if (xhr.status === 204) {
        alert('Booked!')
      }
    });
  });
});