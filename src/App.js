import React, { Component } from "react";

import { observer, Observer, useObserver, inject } from 'mobx-react';
@inject("homeStore")
@observer
class App extends Component {
    render() {
        const { homeStore: home } = this.props;

        return (
            <div>
                <h3>HomePage</h3>
                <p>{home.num}</p>
                <button onClick={() => home.add()}>add</button>
                <button onClick={() => home.minus()}>minus</button>
                <h3>todo列表：</h3>
                <ul>
                    {home.todos.map(todo => (
                        <Todo key={todo.id} todo={todo} change={home.change} />
                    ))}
                </ul>
                <p>被选中：{home.checkedLength}个！</p>
            </div>
        );
    }
}

// 如何给组件添加响应式
// // 方法1： observer hoc（高阶组件：接收组件为参数并且返回一个新组件的函数）
// const Todo = observer(({ todo, change }) => {
//     console.log("todo props"); //sy-log
//     return (
//         <div>
//             <input
//                 type="checkbox"
//                 checked={todo.checked}
//                 //onChange={() => (todo.finished = !todo.finished)}
//                 onChange={() => change(todo)}
//             />
//             {todo.title}
//         </div>
//     );
// });

// const Todo = ({ todo, change }) => {
//     return (
//         <Observer>
//             {() => (
//                 <div>
//                     <input
//                         type="checkbox"
//                         checked={todo.checked}
//                         onChange={() => change(todo)}
//                     />
//                     {todo.title}
//                 </div>
//             )}
//         </Observer>
//     );
// };


// 方法3： useObserver hook
const Todo = ({ todo, change }) => {
    return useObserver(() => (
        <div>
            <input
                type="checkbox"
                checked={todo.checked}
                //onChange={() => (todo.finished = !todo.finished)}
                onChange={() => change(todo)}
            />
            {todo.title}
        </div>
    ));
};
export default App;
