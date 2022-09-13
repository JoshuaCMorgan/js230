var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],

    setDate: function() {
      var date = new Date();
      // 'Fri, 09 Sep 2022 11:35:17 GMT'
      $("#order_date").text(date.toUTCString());
    },

    cacheTemplate: function() {
      var $iTmpl = $("#inventory_item").remove();
      this.template = $iTmpl.html();
    },

    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },

    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },

    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },

    update: function($item) {
      // comma operator: evaluates from left to right
      // returns right expression
      // we set the id and then use it in the right expression to set the item
      var id = this.findID($item),
          item = this.get(id);

       // item = {id: 1, name: '', stock_number: '', quantity: 1}
       // set properties to what is current.
      item.name = $item.find("[name^=item_name]").val();
      item.stock_number = $item.find("[name^=item_stock_number]").val();
      item.quantity = $item.find("[name^=item_quantity]").val();
    },

    newItem: function(e) {
      e.preventDefault();
      // create a new order object with unique id and push to collection.
      // we get template and replace any combo of 'ID' with the value from 
      // newly created order object.
      // then put it in a jQuery object.
      var item = this.add(),
          $item = $(this.template.replace(/ID/g, item.id));

      // find where inventory is and append the html
      $("#inventory").append($item);
    },
    
    findParent: function(e) {
      return $(e.target).closest("tr");
    },

    findID: function($item) {
      // each tr has first td input as the id of item. It is a hidden input will value set to string num.
      return +$item.find("input[type=hidden]").val();
    },

    deleteItem: function(e) {
      e.preventDefault();
      var $item = this.findParent(e).remove();

      this.remove(this.findID($item));
    },

    updateItem: function(e) {
      // get the closest tr element containing 
      // grab all the info about the input item
      var $item = this.findParent(e);
  
      // update input item.
      this.update($item);
    },

    bindEvents: function() {
      // (proxy is a means to make sure inventory object is not changed)
      // invoke newItem when click '#add_item' 
      $("#add_item").on("click", $.proxy(this.newItem, this));
      // invoke delete item on all elements matching target 'a.delete' up to first #inventory 
      $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      // if I start an action on inventory 'items to order', each input will be updated if user clicks anywhere else.
      // blur updates 'on the go'
      $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },

    init: function() {
      console.log(this);
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

/*
- If the argument is a function, jQuery uses that 
function as a callback when the document is ready. 
proxy allows us to bind context.  Here we are binding 'inventory', 
which allows us to use 'this' within our created object.
Otherwise, we would be binding #document to inventory.init
*/
$($.proxy(inventory.init, inventory));

