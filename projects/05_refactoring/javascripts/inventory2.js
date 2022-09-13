let inventory;
(function() {
  let lastId = 0;
  let collection = [];
  return inventory = {
    lastId: 0,
    collection: [],
  
    setDate: function() {
      let date = new Date();
      let order_date = document.querySelector('#order_date');
      order_date.textContent = date.toUTCString(); 
    },
  
    cacheTemplate: function() {
      let iTmpl = document.querySelector('#inventory_item');
      this.template = Handlebars.compile(iTmpl.innerHTML);
      // no real reason to remove it except that we don't need it again.
      iTmpl.remove();
    },
  
    add: function() {
      this.lastId++;
      const item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1,
      };
      this.collection.push(item);
      
      return item;
    },
  
    remove: function() {
      this.collection = this.collection.filter(function(item) {
        return item.id !== id;
      });
    },
  
    get: function(id) {
      let found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
  
    update: function(item) {
      let id = this.findID(itemRow);
      let item = this.get(id);

      item.name = itemRow.querySelector("[name^=item_name]").value;
      item.stock_number = itemRow.querySelector("[name^=item_stock_number]").value;
      item.quantity = itemRow.querySelector("[name^=item_quantity]").value;
    },
  
    newItem: function(event) {
      event.preventDefault();
      let item = this.add();
      document.querySelector('#inventory')
                .insertAdjacentHTML('beforeend', this.template({ id: item.id }));
    },

    findParent: function(event) {
      return event.target.closest('tr');
    },
  
    findID: function(item) {
      return +item.querySelector('input[type=hidden]').value;
    },
  
    deleteItem: function(event) {
      event.preventDefault();
      if (event.target.classList.contains('delete')) {
        let item = this.findParent(event);
        this.remove(this.findID(item));
        item.remove()
      }
    },
  
    updateItem: function(event) {
      if (event.target.tagName == 'INPUT') {
        let item = this.findParent(e);

        this.update(item);
      }
    },
  
    bindEvents: function() {
      document.querySelector("#add_item").addEventListener('click', this.newItem.bind(this));
      document.querySelector("#inventory")
              .addEventListener('click', this.deleteItem.bind(this));
      document.querySelector("#inventory")
              .addEventListener('focusout', this.updateItem.bind(this));
    },
  
    init: function() {
      console.log(this);
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
  
  
  }
})()

document.addEventListener('DOMContentLoaded', event  =>{
  inventory.init()
})