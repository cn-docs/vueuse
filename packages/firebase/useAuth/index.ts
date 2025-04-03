import type { Auth, User } from 'firebase/auth'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref as deepRef } from 'vue'

export interface UseFirebaseAuthOptions {
  isAuthenticated: ComputedRef<boolean>
  user: Ref<User | null>
}

/**
 * 响应式 Firebase 身份验证绑定
 *
 * @see https://vueuse.org/useAuth
 */
export function useAuth(auth: Auth) {
  const user = deepRef<User | null>(auth.currentUser)
  const isAuthenticated = computed(() => !!user.value)

  auth.onIdTokenChanged(authUser => user.value = authUser)

  return {
    isAuthenticated,
    user,
  }
}
