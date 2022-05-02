export function Profile({user, reload}) {

    async function handleSignOut() {
        const res = await fetch("/api/login", {method: "DELETE"});
        if (!res.ok) {
            throw new Error(`Failed to POST ${res.status}: ${res.statusText}`);
        }
        reload()
        window.location.href="/"
        console.log(name)
    }
    const {name, email, picture} = user.google

    console.log(user.google)


    return <div>
        <h1>Welcome, {name}</h1>
        <img src={picture} alt={"profile picture"} width={"120px"}/>
        <div>
                <p>Name: {name}</p>
        </div>
        <div>
            <p>Email: {email}</p>
        </div>

        <button onClick={handleSignOut}>Sign out</button>
    </div>
}