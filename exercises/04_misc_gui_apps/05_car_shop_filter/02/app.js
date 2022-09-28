Handlebars.registerPartial('car_template', $('#car_template').html());

var cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000},
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corrolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];


var App = {
  carsTemplate: Handlebars.compile($('#cars_template').html()),
  filtersTemplate: Handlebars.compile($('#filters_template').html()),
  allCars: cars,
  $cars: $('#cars'),
  $filters: $('#filters'),
  filteredCars: cars,

  renderCars: function() {
    this.$cars.html(this.carsTemplate({cars: this.filteredCars}));
  },

  renderFilterMenu: function() {
    this.$filters.html(this.filtersTemplate(this.generateFilters()));
  },

  handleFilterClick: function() {
    var make  = $('#make_select').val();
    var model = $('#model_select').val();
    var price = Number($('#price_select').val());
    var year  = Number($('#year_select').val());

    var filters = {};

    if (make) filters.make = make;
    if (model) filters.model = model;
    if (price) filters.price = price;
    if (year) filters.year = year;

    this.filterCars(filters);
  },

  filterCars: function(filters) {
    this.filteredCars = _(this.allCars).where(filters);
    this.renderCars();
  },

  generateFilters: function() {
    var makes  = _.uniq(_(this.allCars).pluck('make'));
    var models = _.uniq(_(this.allCars).pluck('model'));
    var prices = _.uniq(_(this.allCars).pluck('price'));
    var years  = _.uniq(_(this.allCars).pluck('year'));

    return { makes: makes, models: models, prices: prices, years: years };
  },

  init: function() {
    this.renderCars();
    this.renderFilterMenu();
    $('.filter_btn').on('click', this.handleFilterClick.bind(this));
  }
};


App.init();
