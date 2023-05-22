import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { postLogin } from '@/api/TreeHole/user'
import type { IUserInfo } from '@/type/TreeHole/user'

// 树洞的用户信息
export const useTreeHoleUserStore = defineStore('TreeHoleUser', () => {
  const token = ref('');
  const userInfo = ref<IUserInfo | null>(null);
  const setToken = (val: string) => {
    token.value = val;
  }
  const setUserInfo = (val: IUserInfo) => {
    userInfo.value = val;
  }

  const login = async (form: { account: string, password: string }) => {
    const { data } = await postLogin(form)
    setToken(data.token);
    setUserInfo(data.userInfo);
    localStorage.setItem('token', data.token)
    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    return true
  }

  return { token, userInfo, setToken, setUserInfo, login }
})

