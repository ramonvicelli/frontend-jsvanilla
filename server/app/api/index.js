const API = {}

const currentDate = new Date();
const previousDate = new Date();
previousDate.setDate(currentDate.getDate() - 7);
const delayedDate = new Date();
delayedDate.setDate(currentDate.getDate() - 14);

const negotiations = [{
    date: currentDate,
    amount: 1,
    value: 150
  },
  {
    date: currentDate,
    amount: 2,
    value: 250
  },
  {
    date: currentDate,
    amount: 3,
    value: 350
  },
  {
    date: previousDate,
    amount: 1,
    value: 450
  },
  {
    date: previousDate,
    amount: 2,
    value: 550
  },
  {
    date: previousDate,
    amount: 3,
    value: 650
  },
  {
    date: delayedDate,
    amount: 1,
    value: 750
  },
  {
    date: delayedDate,
    amount: 2,
    value: 950
  },
  {
    date: delayedDate,
    amount: 3,
    value: 950
  }
];


API.week = (req, res) => res.json(negotiations.filter(negotiation => negotiation.date > previousDate));

API.lastWeek = (req, res) =>
  setTimeout(function () {
    res.json(negotiations.filter(negotiation => negotiation.date < currentDate && negotiation.date > delayedDate));
  }, 500);

API.delayedWeek = (req, res) => res.json(negotiations.filter(negotiation => negotiation.date < previousDate));

API.add = (req, res) => {
  console.log(req.body);
  req.body.data = new Date(req.body.data.replace(/-/g, '/'));
  negotiations.push(req.body);
  res.status(200).json("Negotiation received");
};

module.exports = API;
