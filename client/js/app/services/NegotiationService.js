class NegotiationService {

  getByWeek(cb) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'negotiation/week');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText)
              .map(item => new Negotiation(new Date(item.date), item.amount, item.value))
            );
          } else {
            console.log("Could not retrieve the negotiatios =>", xhr.responseText);
            reject('Could not retrieve the negotiatios of the week.');
          }
        }
      }
      xhr.send();
    });
  }

  getByLastWeek(cb) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'negotiation/lastweek');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText)
              .map(item => new Negotiation(new Date(item.date), item.amount, item.value))
            );
          } else {
            console.log("Could not retrieve the negotiatios =>", xhr.responseText);
            reject('Could not retrieve the negotiatios of the last week.');
          }
        }
      }
      xhr.send();
    });
  }

  getByDelayedWeek(cb) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'negotiation/delayedweek');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText)
              .map(item => new Negotiation(new Date(item.date), item.amount, item.value))
            );
          } else {
            console.log("Could not retrieve the negotiatios =>", xhr.responseText);
            reject('Could not retrieve the negotiations of the delayed week.');
          }
        }
      }
      xhr.send();
    });
  }
}
