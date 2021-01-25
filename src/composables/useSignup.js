import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref(null)

const signup = async (email, password, username) => {
  error.value = null

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)

    if (!res) {
      throw Error('Could not complete signup')
    }
    await res.user.updateProfile({ displayName: username })

    return res

  } catch (err) {
    console.log(err.message)
    error.value = err.message
  }

}

const useSignup = () => {
  return { error, signup }
}

export default useSignup