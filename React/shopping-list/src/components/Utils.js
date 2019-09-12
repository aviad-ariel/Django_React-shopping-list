export const formatDate = data => {
    var date = data.split('T')[0];
    var hour = data.split('T')[1].split('.')[0]
    date = date.replace(/-/g, '/')//| /-/g is to globally replace (all -)
    return hour + " " + date;
}

export const arrangeData = data =>{
    var arr = [];
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; ++i) {
        var arrangedData = {};
        var splitted = keys[i].split(':');
        if (splitted[1]){
            arrangedData['brand'] = splitted[0];
            arrangedData['item_name'] = splitted[1];
        }
        arrangedData['price'] = data[keys[i]];
        arr.push(arrangedData);
    }
    return arr;
}