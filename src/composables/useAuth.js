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

  const signIn = async ({ email, password }) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    })
  }

  const resetPassword = async ( email ) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/reset-password',
      })
      if (error) throw error
      return data
    })
  }

  const updatePassword = async ( password ) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.updateUser({password})
      if (error) throw error
      return data
    })
  }

  return { signUp, signIn, resetPassword, updatePassword, loading, errorMessage }
}