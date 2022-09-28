const cars = [
  {
    make: "Honda",
    image: "images/honda-accord-2005.jpg",
    model: "Accord",
    year: 2005,
    price: 7000,
  },
  {
    make: "Honda",
    image: "images/honda-accord-2008.jpg",
    model: "Accord",
    year: 2008,
    price: 11000,
  },
  {
    make: "Toyota",
    image: "images/toyota-camry-2009.jpg",
    model: "Camry",
    year: 2009,
    price: 12500,
  },
  {
    make: "Toyota",
    image: "images/toyota-corrolla-2016.jpg",
    model: "Corolla",
    year: 2016,
    price: 15000,
  },
  {
    make: "Suzuki",
    image: "images/suzuki-swift-2014.jpg",
    model: "Swift",
    year: 2014,
    price: 9000,
  },
  {
    make: "Audi",
    image: "images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 25000,
  },
  {
    make: "Audi",
    image: "images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 26000,
  },
];

Handlebars.registerPartial("car_template", $("#car_template").html());
const App = {
  carsTemplate: Handlebars.compile($("#cars_template").html()),
  filtersTemplate: Handlebars.compile($("#filters_template").html()),
  allCars: cars,
  $cars: $("#cars"),
  $filters: $("#filters"),
  filteredCars: cars,
  $form: $("form"),

  pluck: function (key) {
    let objsWithKey = this.allCars.filter((obj) => {
      let objKeys = Object.keys(obj);
      return objKeys.includes(key);
    });
    return objsWithKey.map((ob) => ob[key]);
  },

  unique(array) {
    return array.reduce((notDuplicates, currentValue) => {
      if (notDuplicates.includes(currentValue)) {
        return notDuplicates;
      } else {
        notDuplicates.push(currentValue);
        return notDuplicates;
      }
    }, []);
  },

  generateFilters: function () {
    let makes = this.unique(this.pluck("make"));
    let models = this.unique(this.pluck("model"));
    let years = this.unique(this.pluck("year"));
    let prices = this.unique(this.pluck("price"));

    return { makes, models, prices, years };
  },

  renderFilterMenu: function () {
    this.$filters.html(this.filtersTemplate(this.generateFilters()));
  },

  filterCars: function (filters) {
    let result = this.allCars.filter((car) => {
      let values = Object.values(car);

      return filters.every((item) => {
        console.log(item, Number(item).toString);
        if (Number(item).toString() === item) {
          item = Number(item);
        }
        if (item === "all") {
          return true;
        } else {
          
          return values.includes(item);
        }
      });
    });
    return result;
  },

  handleFilterButton: function (event) {
    event.preventDefault();
    let values = [];
    let elements = event.target.elements;
    for (let index = 0; index < elements.length; index += 1) {
      let element = elements[index];
      if (element.type !== "submit") {
        values.push(element.value);
      }
    }

    this.filteredCars = this.filterCars(values);
    this.renderCars();
  },

  renderCars: function () {
    this.$cars.html(this.carsTemplate({ cars: this.filteredCars }));
  },

  init: function () {
    this.renderCars();
    this.renderFilterMenu();
    $("form").on("submit", this.handleFilterButton.bind(this));
  },
};

App.init();
