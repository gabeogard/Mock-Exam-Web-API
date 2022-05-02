import {useLoading} from "./useLoading";
import {fetchJSON} from "./application";

export function Profile({user, signOut}) {

    const {loading, data, error, userinfo} = useLoading(async () => {
        return await fetchJSON("/api/login")
    })

    if(loading){
        return <div>Please wait...</div>
    }
    if(error){
        return <div>Error: {error.toString()}</div>
    }

    const {name, email} = data
    console.log(name)
    console.log(email)


    return <div>
        <h1>Welcome, </h1>
        <pre>add my google email and send me nudes </pre>
        <button onClick={signOut}>Sign out</button>
    </div>
}