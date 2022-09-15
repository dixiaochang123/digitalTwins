// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number,
  userinfo: object,
  token:string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    token: localStorage.getItem('token')?localStorage.getItem('token'):'',
    userinfo: JSON.parse(localStorage.getItem('userinfo'))?JSON.parse(localStorage.getItem('userinfo')):{},
  },
  getters:{
    getCount(state:State):number {
      return state.count

    },
    getToken(state:State):string {
      return state.token

    },
    getUserinfo(state:State):object {
      return state.userinfo

    }
  },
  mutations:{
    setCount(state:State,count:number):void {
      state.count = count

    },
    setToken(state:State,token:string):void {
      let token_session = sessionStorage.getItem('token');

      if (token_session) {
        state.token = token_session;
      } else {
        state.token = token;
      }
    },
    setUserinfo(state:State,userinfo:object):void {
      
      state.userinfo = userinfo
    }
  },
  actions:{
    setCount({ commit }):void {
      commit('setCount')
    },
    setToken({ commit }):void {
      commit('setToken')
    },
    setUserinfo({ commit }):void {
      commit('setUserinfo')
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}