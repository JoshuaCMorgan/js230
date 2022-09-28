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
  filterMenu: cars,

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

  filterMenuCars: function (cars) {
    let filteredCars = this.filterCars2(cars);
    let filter = {};
    filteredCars.forEach((car) => {
      filter.makes ? filter.makes.push(car.make) : (filter.makes = [car.make]);
      filter.models
        ? filter.models.push(car.model)
        : (filter.models = [car.model]);
      filter.prices
        ? filter.prices.push(car.price)
        : (filter.prices = [car.price]);
      filter.years ? filter.years.push(car.year) : (filter.years = [car.year]);
    });

    for (let [key, value] of Object.entries(filter)) {
      filter[key] = this.unique(value);
    }
    //console.log(filter);
    $('form').remove();
    this.renderFilterMenu(filter);
  },

  filterCars2: function (filters) {
    //console.log(filters);
    let result = this.filterMenu.filter((car) => {
      for (let [key, value] of Object.entries(filters)) {
        if (Number(value).toString() === value) {
          value = Number(value);
        }
        if (value === "all") {
          continue;
        }
        if (car[key] !== value) {
          return false;
        }
      }
      return true;
    });

    return result;
  },

  handleSelectOption: function (event) {
    console.log('inside select');
    let name = $(event.target).attr("name");
    let value = $(event.target).val();
    let filter = {};
    filter[name] = value;

     this.filterMenuCars(filter);
  },

  renderFilterMenu: function (filter) {
    console.log(filter)
    if (filter) {
      this.$filters.html(this.filtersTemplate(filter));
    } else {
      this.$filters.html(this.filtersTemplate(this.generateFilters()));
    }
    $("form").on("submit", this.handleFilterButton.bind(this));
  },

  filterCars: function (filters) {
    this.filteredCars = this.filteredCars.filter((car) => {
      for (let [key, value] of Object.entries(filters)) {
        if (Number(value).toString() === value) {
          value = Number(value);
        }
        if (value === "all") {
          continue;
        }
        if (car[key] !== value) {
          return false;
        }
      }
      return true;
    });

    this.renderCars();
  },

  handleFilterButton: function (event) {
    event.preventDefault();
    let filters = {};
    // console.log(event);

    let make = $("#make_select").val();
    let model = $("#model_select").val();
    let price = $("#price_select").val();
    let year = $("#year_select").val();

    if (make) filters.make = make;
    if (model) filters.model = model;
    if (price) filters.price = price;
    if (year) filters.year = year;
    this.filterCars(filters);
  },

  renderCars: function () {
    this.$cars.html(this.carsTemplate({ cars: this.filteredCars }));
  },

  init: function () {
    this.renderCars();
    this.renderFilterMenu();
    $("form").on("submit", this.handleFilterButton.bind(this));
    $("form").on("change", this.handleSelectOption.bind(this));
  },
};

App.init();
