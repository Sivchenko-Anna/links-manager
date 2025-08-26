import { supabase } from '@/supabase.js'
import { useRequest } from '@/composables/useRequest.js'

export function useAuth() {
  const { loading, errorMessage, handleRequest } = useRequest()
  const signUp = async ({ email, password, firstName }) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      await supabase.from('users').insert([{ id: data.user.id, firstname: firstName, email }])
      if (error) throw error
      return data
    })
  }

  return { signUp, loading, errorMessage }
}