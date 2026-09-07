const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  function handleLogin() {
    try {

      window.location.href = `${API_URL}/auth/google`
    } catch (err) {
      console.log(err);

    }

  }

  return (
    <>
      <div>
        <h1>Login with google</h1>
        <button className='btn-login  border-2 border-red-300 bg-amber-50 p-3 hover:cursor-pointer' type='button' onClick={handleLogin}>Login/signup with google</button>
      </div>
    </>
  )
}
