function BinarySearchTree() {
    this.treeRoot = null;
};

function Node(key, value) {
    this.key = key;
    this.value = value;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
};

BinarySearchTree.prototype.root = function() {
    if (this.treeRoot === null) {
        return undefined;
    }
    return this.treeRoot.value;
};

BinarySearchTree.prototype.insert = function(key, value) {
    var newNode = new Node(key, value);

    if (this.treeRoot === null) {
        this.treeRoot = newNode;
    } else {
        var currentNode = this.treeRoot;
        var parentNode;
        while (true) {
            parentNode = currentNode;
            if (key > currentNode.key) {
                currentNode = currentNode.rightChild;
                if (currentNode === null) {
                    parentNode.rightChild = newNode;
                    return this;
                }
            } else {
                currentNode = currentNode.leftChild;
                if (currentNode === null) {
                    parentNode.leftChild = newNode;
                    return this;
                }
            }
        }
    }
    return this;
};

BinarySearchTree.prototype.search = function(key) {
    var currentNode = this.treeRoot;
    while (key !== currentNode.key) {
        if (key > currentNode.key) {
            currentNode = currentNode.rightChild;
        } else {
            currentNode = currentNode.leftChild;
        }
        if (currentNode === null) {
            return undefined;
        }
    }
    return currentNode.value;
};

var print = function(node, order, array) {
    if (!node) {
        return;
    }

    if (order) {
        print(node.leftChild, order, array);
        array.push(node.value);
        print(node.rightChild, order, array);
    } else {
        print(node.rightChild, order, array);
        array.push(node.value);
        print(node.leftChild, order, array);
    }
    return array;
};

BinarySearchTree.prototype.traverse = function(order) {
    return print(this.treeRoot, order, []);
};

BinarySearchTree.prototype.contains = function(value) {
    var array, i = 0;
    if (this.treeRoot === null) {
        return false;
    }
    array = print(this.treeRoot, true, []);

    for(i; i < array.length; i++) {
        if(array[i] === value) {
            return true;
        }
    }
    return false;
};

var findSuccessor = function(node) {
    var successor = node;
    var successorParent = node;
    var currentNode = node.rightChild;

    while (currentNode !== null) {
        successorParent = successor;
        successor = currentNode;
        currentNode = currentNode.leftChild;
    }
    if (node.rightChild !== successor) {
        successorParent.leftChild = successor.rightChild;
        successor.rightChild = node.rightChild;
    }
    return successor;
};

BinarySearchTree.prototype.delete = function(key) {
    var currentNode = parent = this.treeRoot;
    var isLeft = true;
    var successor;

    while (currentNode.key !== key) {
        parent = currentNode;
        if (key > currentNode.key) {
            isLeft = false;
            currentNode = currentNode.rightChild;
        } else {
            currentNode = currentNode.leftChild;
        }
        if (currentNode === null) {
            return this;
        }
    }

    if (currentNode.leftChild === null && currentNode.rightChild === null) {
        if (currentNode === this.treeRoot) {
            this.treeRoot = null;

        } else isLeft ? parent.leftChild = null : parent.rightChild = null;

    } else if (currentNode.leftChild === null) {

        if (currentNode === this.treeRoot) {
            this.treeRoot = currentNode.rightChild;

        } else isLeft ? parent.leftChild = currentNode.rightChild : parent.rightChild = currentNode.rightChild;

    } else if (currentNode.rightChild === null) {

        if (currentNode === this.treeRoot) {
            this.treeRoot = currentNode.leftChild;

        } else isLeft ? parent.leftChild = currentNode.leftChild : parent.rightChild = currentNode.leftChild;

    } else {
        successor = findSuccessor(currentNode);
        successor.leftChild = currentNode.leftChild;

        if (currentNode === this.treeRoot) {
            this.treeRoot = successor;

        } else isLeft ? parent.leftChild = successor : parent.rightChild = successor;
    }

    return this;
};

var getKeyArray = function(node, array) {
    if (!node) {
        return;
    }
    getKeyArray(node.leftChild, array);
    array.push(node.key);
    getKeyArray(node.rightChild, array);
    return array;
};

BinarySearchTree.prototype.verify = function() {
    var isSorted = true;
    var array = getKeyArray(this.treeRoot, []);
    var i = 0;

    for (i; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            isSorted = false;
            break;
        }
    }
    return isSorted;
};