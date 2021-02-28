import { observable, action, computed, runInAction, makeObservable } from "mobx";
import axios from "axios";

class HomeStore {
    constructor() {
        makeObservable(this);
    }

    /**
     * 状态
     */
    @observable homeNum = 0;
    @observable homeNum2 = 1;
    @observable list = ["1"];
    @observable token = "";

    /**
     * 事件
     */
    @action changeHomeNum = () => {
        this.homeNum++;
    };
    @action changeHomeNum2 = () => {
        this.homeNum2++;
    };
    // 异步事件，发起请求
    @action getList = async () => {
        let res = await axios.post("/user/login", { username: "xxx", password: "123" });
        runInAction(() => {
            // 通过 runInAction 在异步中改变数据的值
            this.token = res.data.token;
        });
    };

    /**
     * 计算属性（有getter和setter方法，get用于返回计算的参数，set用于逆向导出某个状态）
     */
    // get 计算
    @computed get calculationNum() {
        return this.homeNum + this.homeNum2;
    }
}

export default HomeStore;