var traverse = require('traverse');
var fs = require('fs');

fs.readFile('./tree.json', function (err, data) {
    var json = JSON.parse(data);

    var leaves = traverse(json).reduce(function (acc) {
        if (this.isLeaf) {
            var node = this.parent.node;
            if (node.key && node.title && !node.children) {
                var video = 'KEY:   ' + node.key + '\n' + 'TITLE: ' + node.title + '\n';
                if (acc.indexOf(video) == -1) {
                    acc += video;
                }
            }
        }
        return acc;
    }, '');

    fs.writeFile("./result", leaves);
});

