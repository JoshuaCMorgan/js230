const DOMAIN = 'http://localhost:3000';

    
function fetchSchedules(url) {
  let request = new XMLHttpRequest()
  
  request.open('GET', DOMAIN + url);
  request.timeout = 5000;
  request.responseType = 'json'

  
  request.addEventListener('load', event => {
    const schedules = request.response;
    const staffSchedules = {};
    if (schedules.length > 0) {
      schedules.forEach(schedule => {
        let staffId = `staff ${schedule.staff_id}`;
        if (staffSchedules[staffId]) {
          staffSchedules[staffId].push(schedule);
        } else {
          staffSchedules[staffId] = [schedule];
        }
      })

      let result = ''
      for (const [key, value] of Object.entries(staffSchedules)) {
        result += `${key}: ${value.length}\n`
      }

      alert(result);
    } else {
      alert('There are currently no schedules available for booking');
    }
  })

  request.addEventListener('timeout', event => {
    alert('It is taking longer than usual, please try again later.')
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });
  
  request.send();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchSchedules('/api/schedules');
})