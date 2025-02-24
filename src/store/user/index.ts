// stores/counter.js
import { defineStore } from 'pinia'
import pinia from '@/store';
import { userLogin,refreshUserInfo } from '@/api/user';

export interface UserState {
    username: string;
    accessToken: string;
    refreshToken?: string;
    roles:Array<string>;
}

export type LoginRequest = {
    username: string;
    password: string;
}

export const useUserStoreHook = defineStore('userInfo', {
  state: ():UserState => ({
    username:'lh',
    accessToken:'',
    roles:['common']
  }),
  getters:{},
  actions: {
    storeUserLogin(data:LoginRequest) {
        return userLogin(data).then((res) => {
            this.username = res.username;
            this.accessToken = res.accessToken;
            this.roles = res.roles;
            return res;
        })
    },
    storeRefreshUserInfo() {
        if(this.username == 'lh' && this.accessToken != ''){
            refreshUserInfo({
                accessToken:this.accessToken,
            }).then((res) => {
                this.username = res.username;
                this.accessToken = res.accessToken;
                this.roles = res.roles; 
            }).catch(() => {
                this.accessToken = '';
            })
        }
    },
  },
  // 配置仓库状态的持久化，将 accessToken 存储在 sessionStorage 中，键为 userInfo
  persist: {
        key: 'userInfo',
        storage:sessionStorage,
        pick:['accessToken']
  }
})
// 创建仓库实例时传入 pinia 实例，能够确保这个仓库与应用中的 Pinia 实例建立关联，这样仓库就可以和其他仓库进行交互，并且能响应应用的状态变化。
export function useUserStore() {
    return useUserStoreHook(pinia)
}