import { observable, action, computed, autorun, when, reaction } from "mobx";

class HomeStore {
    @observable num = 0;
    @observable todos = [
        {
            id: "0",
            checked: false,
            title: "列表1"
        },
        {
            id: "1",
            checked: true,
            title: "列表2"
        }
    ];
    @action add() {
        this.num += 1;
    }
    @action minus() {
        this.num -= 1;
    }
    @action change(todo) {
        todo.checked = !todo.checked;
    }
    @computed get checkedLength() {
        return this.todos.filter(todo => todo.checked).length;
    }
}
autorun(() => {
    console.log('auto run ')
})

const home = new HomeStore();
// when当满足条件执行回调，然后删除
when(() => home.checkedLength == 2, () => {
    console.log(2222222, 'when')
})

// reaction当满足条件执行回调
reaction(() => home.checkedLength == 2, () => {
    console.log(2222222, 'reaction')
})

export default home;



// const { observable, makeAutoObservable, action, computed } = require("mobx");

// let id = 0
// class AppleBasket {
//     apples = []

//     constructor() {
//         makeAutoObservable(this,
//             {
//                 apples: observable,
//                 addItem: action,
//                 eatApple: action,
//                 ateApples: computed,
//                 unateApples: computed,
//             }
//         )
//     }
//     //action
//     addItem(weight) {
//         const newItem = {
//             id: id++,
//             ate: false,
//             weight
//         }
//         this.apples.push(newItem)
//     }

//     eatApple = (appleId) => {
//         editItem(this.apples, ({ id }) => appleId === id, apple => apple.ate = true)
//     }

//     pickApple = () => {
//         const weight = 180 + Math.floor(Math.random() * 50)
//         this.addItem(weight)
//     }

//     //computed
//     get ateApples() {
//         return getFilterItems(this.apples, ({ ate }) => ate)
//     }
//     get unateApples() {
//         return getFilterItems(this.apples, ({ ate }) => !ate)
//     }
// }

// const store = new AppleBasket()
// export default store

// function getTotalWeight(items) {
//     return items.reduce((total, { weight }) => total + weight, 0)
// }

// function getFilterItems(items, filter) {
//     items = items.filter(filter)
//     return { items, count: items.length, totoalWeight: getTotalWeight(items) }
// }

// function editItem(items, predicate, editItemFn) {
//     items.forEach(item => predicate(item) && editItemFn(item))
// }