import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { postLogin, getUserFllowApi } from '@/api/TreeHole/user'
import type { IUserInfo } from '@/type/TreeHole/user'

// 树洞的用户信息
export const useTreeHoleUserStore = defineStore('TreeHoleUser', () => {
  const token = ref('');
  const userInfo = ref<IUserInfo>({
    ACCOUNT: '',
    AVATAR: '',
    EMAIL: '',
    USER_UUID: '',
    MOBILE_PHONE: '',
    PASSWORD: '',
    TOKEN: '',
    VERIFY_KEY: '',
    status: '',
  });
  const follow = ref<any[]>([]); // 用户关注的文章列表
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
  const getFollow = async () => {
    const { data } = await getUserFllowApi();
    follow.value = data;
    localStorage.setItem('follow', JSON.stringify(data));
  }
  const setFollow = (data: any[]) => {
    follow.value = data;
  }

  return {
    token, userInfo, setToken, setUserInfo, login, follow,
    getFollow,setFollow
  }
})

