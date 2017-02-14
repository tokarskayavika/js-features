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

    it('should insert an element to left child if node key is less than root key', function() {
      var resultKey, resultValue;
      bst.insert(14, 'Meow');
      bst.insert(13, 'Moo');

      resultKey = bst.treeRoot.leftChild.key;
      resultValue = bst.treeRoot.leftChild.value;
      resultKey.should.be.equal(13);
      resultValue.should.be.equal('Moo');
    });
  });
});
