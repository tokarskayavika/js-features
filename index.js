var ListItem = Backbone.Model.extend({
    defaults: {
        title: "My title",
        price: 0,
        checked: false
    }
});

var List = Backbone.Collection.extend({
    model: ListItem
});

var items = new List([
    new ListItem({
        title: 'A',
        price: 100
    }),
    new ListItem({
        title: 'B',
        price: 200
    })
]);

var ItemView = Backbone.View.extend({
    tagname: 'li',
    render: function() {
        console.log(this);
        this.$el.html(`<button></button>`);
    }
});

var App = Backbone.View.extend({
    el: $('form'),
    initialize: function() {
        items.each(function(it) {
            var view = new ItemView({
                model: it
            });
            console.log(view);
            $('ul').append(view.render());
        }, this);
    }
});

new App();
