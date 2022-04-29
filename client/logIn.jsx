import {useEffect, useState} from "react";

async function fetchJSON(url){
    const res = await fetch(url)
    if(!res.ok){
        throw new Error(`failed ${res.status}`)
    }
    return await res.json()
}

export function LogIn() {
    const [redirectUrl, setRedirectUrl] = useState()
    useEffect(async () => {
        const {authorization_endpoint} = await fetchJSON(
            "https://accounts.google.com/.well-known/openid-configuration"
        )
        const parameters = {
            response_type: "token",
            client_id: "206945603376-3u9pneh2e5rpt55a69v4ntt03dqpmjas.apps.googleusercontent.com",
            scope: "email profile",
            redirect_uri: window.location.origin + "/login/callback"
        }
        setRedirectUrl(authorization_endpoint + "?" + new URLSearchParams(parameters))
    }, [])
    return <div>
        <h1>Choose sign-in option</h1>
        <button><a href={redirectUrl}>Sign in with Google</a></button>
        <div>{redirectUrl}</div>
    </div>
}

export function LogInCallback() {
    useEffect(async () => {
        const {access_token} = Object.fromEntries(
            new URLSearchParams(window.location.hash.substring(1))
        )

        await fetch("/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({access_token})
        })
    }, [])

}