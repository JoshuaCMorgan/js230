function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4 & xhr.status === 200) {
        let data = xhr.response;
        resolve(data);
      } else if (xhr.readyState === 4) {
        reject('error getting resources');
      }
    })     
  })
}

function bookingDetailsTemplate(data) {
  const ulEle = document.createElement('ul');
  data.forEach(({staffName, studentEmail, time}) => {
      const li = document.createElement('li');
      li.textContent = `${staffName} | ${studentEmail} | ${time}`;
      ulEle.appendChild(li);
  });

  return ulEle;
}

function bookingListTemplate(data) {
  const li = document.createElement('li');
  li.textContent = data;
  return li;
}

function loadBookings(dates) {
  return new Promise((resolve, reject) => {
    const bookingList = document.querySelector('#bookings-list');
    dates.forEach(date => {
        bookingList.appendChild(bookingListTemplate(date));
    });
    resolve();
  }) 
}

function renderBookingDetails(node, bookings) {
  const bookingsObject = bookings.map(booking => ({
      staffName: booking[0],
      studentEmail: booking[1],
      time: booking[2]
  }));

  node.appendChild(bookingDetailsTemplate(bookingsObject));
}

document.addEventListener('DOMContentLoaded', async(event) => {
    try {
      let dates = await makeRequest('/api/bookings');
      await loadBookings(dates);
    } catch(error) {
      console.log(error);
    }

  document.querySelector('#bookings-list').addEventListener('click', ({target}) => {
    if (target.tagName === 'LI') {
      if (target.childElementCount === 0) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/bookings/${target.textContent}`);
        xhr.responseType = 'json'
        xhr.send();
        xhr.addEventListener('load', () => {
            data = xhr.response;
            renderBookingDetails(target, data);
        });
      }
    }
  });

})