import { UserAuth } from '../context/AuthContext'

export const Navbar = () => {
    const { logOut, user, googleSignIn} = UserAuth()

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch(error){
            console.log(error)
        }
    }

    const handleSignIn = async () => {
        try {
          await googleSignIn()
        } catch(error) {
          console.log(error)
        }
    }

    const Button = () => {
        if(user?.uid) {
            return (
            <>
            <button onClick={handleSignOut}>Sign out</button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12L1.60957 11.6877L1.35969 12L1.60957 12.3123L2 12ZM11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5V12.5ZM5.60957 6.68765L1.60957 11.6877L2.39043 12.3123L6.39043 7.31235L5.60957 6.68765ZM1.60957 12.3123L5.60957 17.3123L6.39043 16.6877L2.39043 11.6877L1.60957 12.3123ZM2 12.5H11V11.5H2V12.5Z" fill="white"/>
                <path d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066" stroke="white"/>
            </svg>
            </>
            )
        } else {
            return (
            <>
            <button onClick={handleSignIn}>Sing in</button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7.13193V6.61204C7 4.46614 7 3.3932 7.6896 2.79511C8.37919 2.19703 9.44136 2.34877 11.5657 2.65224L15.8485 3.26408C18.3047 3.61495 19.5327 3.79039 20.2664 4.63628C21 5.48217 21 6.72271 21 9.20377V14.7962C21 17.2773 21 18.5178 20.2664 19.3637C19.5327 20.2096 18.3047 20.385 15.8485 20.7359L11.5657 21.3478C9.44136 21.6512 8.37919 21.803 7.6896 21.2049C7 20.6068 7 19.5339 7 17.388V17.066" stroke="white"/>
                <path d="M16 12L16.3904 11.6877L16.6403 12L16.3904 12.3123L16 12ZM4 12.5C3.72386 12.5 3.5 12.2761 3.5 12C3.5 11.7239 3.72386 11.5 4 11.5V12.5ZM12.3904 6.68765L16.3904 11.6877L15.6096 12.3123L11.6096 7.31235L12.3904 6.68765ZM16.3904 12.3123L12.3904 17.3123L11.6096 16.6877L15.6096 11.6877L16.3904 12.3123ZM16 12.5H4V11.5H16V12.5Z" fill="white"/>
            </svg>
            </>
            )
        }
    }

    return (
    <div className="absolute w-full flex py-5 items-center">
        <div className="w-3/5 flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 flex gap-2 text-gray-200">
            <Button />
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
    </div>
    )
}