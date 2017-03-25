/**
 * Created by summersnake on 2017/2/26.
 */
var app = new Vue({
    el: '#app',
    data: {
        newPerson: {
            name: '',
            age: 0,
            sex: 'Male'
        },
        people: [
            {
                name: 'Jack',
                age: 28,
                sex: "Male"
            }, {
                name: 'Willa',
                age: 27,
                sex: 'Female'
            }, {
                name: 'Bill',
                age: 26,
                sex: 'Male'
            }, {
                name: 'Kate',
                age: 25,
                sex: 'Female'
            }, {
                name: 'Chris',
                age: 24,
                sex: 'Male'
            }
        ]
    },
    methods: {
        createPerson: function () {
            this.people.push(this.newPerson);
            // 添加完newPerson对象后，重置newPerson对象
            this.newPerson = {name: '', age: 0, sex: 'Male'}
        },
        deletePerson: function (index) {
            //删除一个数组元素
            this.people.splice(index, 1);
        }
    }
});