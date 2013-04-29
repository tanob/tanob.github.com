function MyName(name) {
    var name = name;
    return {
        get: function() { return name },
        set: function(newName) { name = newName },
    }
}

var objs = [];
for (var i=1; i <= 100000; i++) {
    objs[i] = MyName("Donald");
    if (i % 100 == 0) {
        var m = process.memoryUsage();
        console.log([i, usedHeap(m), totalHeap(m)].join("\t"));
    }
}

function totalHeap(memory) {
    return mb(memory.heapTotal);
}

function usedHeap(memory) {
    return mb(memory.heapUsed);
}

function mb(bytes) {
    return (bytes / 1024 / 1024).toFixed(2);
}

