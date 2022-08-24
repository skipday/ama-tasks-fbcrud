import type { NextPage } from 'next'
import { UserAuth } from '../context/AuthContext';
import GoogleButton from 'react-google-button'
import Div100vh from 'react-div-100vh';


import { Todos } from '../components/Todos'

const Home: NextPage = () => {
  const { googleSignIn, user, loading } = UserAuth()

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch(error) {
      console.log(error)
    }
  }
  
  const Content = () => {
    if(user?.uid) {
      return (
        <div className="max-w-screen-lg w-full">
          <Todos />
        </div>
      )
    } else {
      return (
          <div className="w-full grid place-items-center text-gray-200">
            <div>
              <h1 className="text-3xl mb-0.5">Hi there!</h1>
              <div className="mb-4">please sign in to view your todos</div>
              <GoogleButton
                onClick={handleSignIn}
              />
            </div>
          </div>
      )
    }
  }
  
  return (
    <Div100vh>
        <div className="container h-full w-full pt-12 flex justify-center box-border max-w-full">
          <>
          {(!loading) ? <Content /> : ''}
          </>
        </div>
    </Div100vh>
  )
}

export default Home
