describe('binary-search-tree', function() {

    var bst;

    beforeEach(function() {
        bst = new BinarySearchTree();
    });

    describe('root', function() {
        it('should return undefined if tree is empty', function() {
            var result = bst.root();
            should.not.exist(result);
        });
        it('should return root of the tree if it exists', function() {
            var result;
            bst.insert(14, 'Meow');
            result = bst.root();
            result.should.be.equal('Meow');
        });
    });

    describe('insert', function() {
        it('should insert an element to root of tree if it is empty', function() {
            var result;
            bst.insert(14, 'Meow');
            result = bst.root();
            result.should.be.equal('Meow');
        });

        it('should insert an element to left child of node if element key is less than node key', function() {
            var resultKey, resultValue, resultChildKey, resultChildValue;
            bst.insert(14, 'Meow');
            bst.insert(13, 'Moo');
            bst.insert(5, 'Woof');

            resultKey = bst.treeRoot.leftChild.key;
            resultValue = bst.treeRoot.leftChild.value;

            resultChildKey = bst.treeRoot.leftChild.leftChild.key;
            resultChildValue = bst.treeRoot.leftChild.leftChild.value;

            resultKey.should.be.equal(13);
            resultValue.should.be.equal('Moo');
            resultChildKey.should.be.equal(5);
            resultChildValue.should.be.equal('Woof');
        });

        it('should insert an element to right child of node if element key is greater than node key', function() {
            var resultKey, resultValue, resultChildKey, resultChildValue;
            bst.insert(14, 'Meow');
            bst.insert(18, 'Moo');
            bst.insert(58, 'Woof');

            resultKey = bst.treeRoot.rightChild.key;
            resultValue = bst.treeRoot.rightChild.value;

            resultChildKey = bst.treeRoot.rightChild.rightChild.key;
            resultChildValue = bst.treeRoot.rightChild.rightChild.value;

            resultKey.should.be.equal(18);
            resultValue.should.be.equal('Moo');
            resultChildKey.should.be.equal(58);
            resultChildValue.should.be.equal('Woof');
        });

        it('should be chainable', function() {
            var result = bst.insert(14, 'Meow');
            result.should.be.instanceof(BinarySearchTree);
        });
    });
});
