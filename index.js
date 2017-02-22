var ItemModel = Backbone.Model.extend({
    defaults: {
        name: 'myName',
        price: 0
    },
    validate: function() {
        if (attrs.price < 0) {
            console.log('incorrect price');
        }
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
}];

var items = new ItemCollection(itemArray);

var ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'item',
    // template: _.template('This is <%= this.name %>'),
    initialize: function() {
        this.render();
        console.log(this);
    },
    render: function() {
        // console.log(this.$el.html('<button>Hello</button>'));
        // var template = this.template;
        // console.log(template);
        // console.log(template(items.at(0).get('name')));
        // console.log(this.$el);
        this.$el.html('<button>Hello</button>');
        return this;
    }
});

var AppView = Backbone.View.extend({
    // el: $('form'),
    initialize: function() {
        new ItemView({});
        items.each(function(model, index) {
            console.log(model, index);
            var itemView = new ItemView(model);
            // console.log(this.model);
            // console.log('create new item');
            // new ItemView(model);
            $('.list').append(itemView.render());
        });
    }
});

new AppView();
