import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { postLogin } from '@/api/TreeHole/user'
// 树洞的用户信息
export const useTreeHoleUserStore = defineStore('TreeHoleUser', () => {
  const token = ref('');
  const account = ref('');
  const setToken = (val: string) => {
    token.value = val;
  }
  const setAccount = (val: string) => {
    account.value = val;
  }

  const login = async (form: { account: string, password: string }) => {
    const loginRes = await postLogin(form)
    setToken(loginRes.data);
    localStorage.setItem('token',loginRes.data)
    setAccount(form.account);
    return loginRes.errno==0
  }

  return { token, setToken, login }
})

