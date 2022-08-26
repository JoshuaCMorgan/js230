function scheduleTemplate({number, staffs}) {
  const container = document.createElement('div');
  const legend = document.createElement('legend');
  legend.textContent = `Schedule ${number}`;
  container.appendChild(legend);

  const dl = document.createElement('dl');
  const dtStaff = document.createElement('dt');
  const dtLabelStaff = document.createElement('label');
  dtLabelStaff.textContent = 'Staff Name';
  dtLabelStaff.setAttribute('for', `staff_${number}`);
  dtStaff.appendChild(dtLabelStaff);
  dl.appendChild(dtStaff);

  const ddStaff = document.createElement('dd');
  const ddSelectStaff = document.createElement('select');
  ddSelectStaff.setAttribute('id', `staff_${number}`);
  ddSelectStaff.setAttribute('name', `staff_${number}`);
  staffs.forEach(({id, name}) => {
      const option = document.createElement('option');
      option.setAttribute('value', id);
      option.textContent = name;
      ddSelectStaff.appendChild(option);
  });
  ddStaff.appendChild(ddSelectStaff);
  dl.appendChild(ddStaff);

  const dtDate = document.createElement('dt');
  const dtLabelDate = document.createElement('label');
  dtLabelDate.textContent = 'Date';
  dtLabelDate.setAttribute('for', `date_${number}`);
  dtDate.appendChild(dtLabelDate);
  dl.appendChild(dtDate);

  const ddDate = document.createElement('dd');
  const ddInputDate = document.createElement('input');
  ddInputDate.setAttribute('type', 'text');
  ddInputDate.setAttribute('id', `date_${number}`);
  ddInputDate.setAttribute('name', `date_${number}`);
  ddInputDate.setAttribute('placeholder', 'mm-dd-yy');
  ddDate.appendChild(ddInputDate);
  dl.appendChild(ddDate);

  const dtTime = document.createElement('dt');
  const dtLabelTime = document.createElement('label');
  dtLabelTime.textContent = 'Time';
  dtLabelTime.setAttribute('for', `time_${number}`);
  dtTime.appendChild(dtLabelTime);
  dl.appendChild(dtTime);

  const ddTime = document.createElement('dd');
  const ddInputTime = document.createElement('input');
  ddInputTime.setAttribute('type', 'text');
  ddInputTime.setAttribute('id', `time_${number}`);
  ddInputTime.setAttribute('name', `time_${number}`);
  ddInputTime.setAttribute('placeholder', 'hh:mm');
  ddTime.appendChild(ddInputTime);
  dl.appendChild(ddTime);

  container.appendChild(dl);
  return container;
}

function formInputsToJSON(form, count) {
  const json = []
  for (let i = 1; i <= count; i++) {
    let schedule = {};
    
    schedule.staff_id = form[`staff_${count}`].value;
    schedule.date = form[`date_${count}`].value;
    schedule.time = form[`time_${count}`].value;
    json.push(schedule);
  }
  return {schedules: json};
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form')
  let staffs = [];
  let scheduleCount = 0;
  (() => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/staff_members');
    xhr.responseType = 'json';
    xhr.send();

    xhr.addEventListener('load', event => {
      staffs = xhr.response;
    })
  })()
  
  document.querySelector('#btnAdd').addEventListener('click', (event) => {
    event.preventDefault()

    let fieldset = document.createElement('fieldset');
    scheduleCount += 1;
    fieldset.id = `schedule_${String(scheduleCount)}`;
    fieldset.appendChild(scheduleTemplate({ number: scheduleCount, staffs }));
    document.querySelector('#schedules').appendChild(fieldset);
  })

  form.addEventListener('submit', event => {
    event.preventDefault();
    const jsonData = JSON.stringify(formInputsToJSON(form, scheduleCount));
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(jsonData);

    xhr.addEventListener('load', () => {
      if (xhr.status === 201) form.reset();
      alert(xhr.responseText);
    });

  })
});