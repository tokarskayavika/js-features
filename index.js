var ItemModel = Backbone.Model.extend({
    defaults: {
        name: 'myName',
        price: 0,
        checked: false
    },
    toggle: function() {
        this.set('checked', !this.get('checked'));
    }
});

var ItemCollection = Backbone.Collection.extend({
    model: ItemModel,
    getChecked: function() {
        return this.where({ checked: true });
    }
});

var itemArray = [{
    name: 'Scissors',
    price: 50
}, {
    name: 'Knife',
    price: 100
}, {
    name: 'Spoon',
    price: 150
}, {
    name: 'Rocket',
    price: 900
}, {
    name: 'Cat',
    price: 10000
}, {
    name: 'Bath',
    price: 7400
}];

var items = new ItemCollection(itemArray);

var ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'item',
    
    events: {
        'click label': 'toggleItem'
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(`<input type="checkbox" id="${this.model.cid}"/><label for="${this.model.cid}">
            name: <span>${this.model.attributes.name}</span>,
            price: <span>${this.model.attributes.price}</span></label>`);
        return this;
    },
    toggleItem: function(event) {
        this.model.toggle();
    }
});

var AppView = Backbone.View.extend({
    el: $('#my-list'),

    initialize: function() {
        this.collection = items;
        this.listenTo(this.collection, 'change', this.countTotal);
        this.render();
    },

    render: function() {
        this.collection.each(function(item) {
            var itemView = new ItemView({
                model: item
            });
            this.$el.append(itemView.render().el);
        }, this);
    },

    countTotal: function() {
        var checkedElements = this.collection.getChecked();
        var sum = 0;
        checkedElements.forEach((item) => {
            sum += item.attributes.price;
        })
        $('#total').html(sum);
    }
});

new AppView();
