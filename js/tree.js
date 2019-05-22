let arr = [
    {
        "id": "1",
        "name": "老爷爷",
        "parentId": "0"
    },
    {
        "id": "2",
        "name": "老奶奶",
        "parentId": "0"
    },
    {
        "id": "3",
        "name": "爷爷",
        "parentId": "1"
    },
    {
        "id": "4",
        "name": "父亲",
        "parentId": "3"
    },
    {
        "id": "5",
        "name": "我",
        "parentId": "4"
    },
    {
        "id": "6",
        "name": "儿子",
        "parentId": "5"
    },
    {
        "id": "7",
        "name": "女儿",
        "parentId": "5"
    }
];

/**
 * 对象方法
 */
function setTreeData(arr) {
    // 删除所有 children,以防止多次调用
    arr.forEach(function (item) {
        delete item.children;
    });
    let map = {}; // 构建map
    arr.forEach(i => {
        map[i.id] = i; // 构建以 id 为键 当前数据为值
    });

    let treeData = [];
    arr.forEach(child => {
        const mapItem = map[child.parentId]; // 判断当前数据的parentId是否存在map中

        if (mapItem) { // 存在则表示当前数据不是最顶层数据
            // 注意: 这里的 map 中的数据是引用了 arr 的它的指向还是 arr，当 mapItem 改变时 arr 也会改变,踩坑点
            // 这里判断 mapItem 中是否存在 children, 存在则插入当前数据, 不存在则赋值 children 为[]然后再插入当前数据
            (mapItem.children || ( mapItem.children = [] )).push(child);
        } else { // 不存在则是组顶层数据
            treeData.push(child);
        }
    });

    return treeData;
}

console.log(setTreeData(arr)); // 输出整理后的数据

/**
 * 递归方法
 */
let list = []; // 存储最终数据

arr.forEach((obj, i) => {
    if (obj.parent === "0") {
        recursion(obj);
        list.push(obj);
        delete arr[i];
    }
});

function recursion(json) {
    arr.forEach((obj, i) => {
        if (obj.parent === json.id) {
            if (json.children) {
                json.children.push(obj);
            } else {
                json.children = [];
                json.children.push(obj);
            }
            recursion(obj);
            delete arr[i];
        }
    })
}

console.log(list);