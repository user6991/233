import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User>({} as User)
    
    const setUser = (userData: User) => {
      user.value = userData
    }
    
    const delUser = () => {
      user.value = {} as User
    }
    
    return { user, setUser, delUser }
  },
  {
    persist: {
      key: 'incubator-user',
    }
  }
)
