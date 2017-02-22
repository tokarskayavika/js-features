var ItemModel = Backbone.Model.extend({
    defaults: {
        name: 'myName',
        price: 0,
        checked: false
    }
});

var ItemCollection = Backbone.Collection.extend({
    model: ItemModel
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
}];

var items = new ItemCollection(itemArray);

var ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'item',
    // template: _.template('This is <%= this.name %>'),
    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(`<input type="checkbox"/>
            name: <span>${this.model.attributes.name}</span>,
            price: <span>${this.model.attributes.price}</span>`);
        return this;
    }
});

var AppView = Backbone.View.extend({
    el: $('#my-list'),

    initialize: function() {
        this.collection = items;
        this.render();
    },

    render: function() {
        this.collection.each(function(item) {
            var itemView = new ItemView({
                model: item
            });
            this.$el.append(itemView.render().el);
        }, this);
    }
});

new AppView();
