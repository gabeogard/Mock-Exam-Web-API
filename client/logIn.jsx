import {useContext, useEffect, useState} from "react";
import {Route, useNavigate, Routes, useParams} from "react-router-dom";
import {ExamApiContext} from "./examApiContext";

async function fetchJSON(url) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`failed ${res.status}`)
    }
    return await res.json()
}

function LoginButton({config, label, provider}) {
    async function handleLogin() {
        const {
            authorization_endpoint,
            response_type,
            scope,
            client_id
        } = config[provider]


        const parameters = {
            response_type,
            response_mode: "fragment",
            client_id,
            scope,
            redirect_uri: `${window.location.origin}/login/${provider}/callback`,
        }

        window.location.href =
            authorization_endpoint + "?" + new URLSearchParams(parameters)
    }

    return (
        <div>
            <button onClick={handleLogin}>{label}</button>
        </div>
    )
}

function StartLogin({config}) {
    return (
        <div>
            <h1>Login</h1>
            <LoginButton
                label={"Login with Google"}
                config={config}
                provider={"google"}
            />
        </div>
    )
}

export function LoginCallback({reload, config}) {
    const {provider} = useParams();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const {registerLogin} = useContext(ExamApiContext);
    useEffect(async () => {
        const {access_token, error, error_description, state, code} =
            Object.fromEntries(
                new URLSearchParams(window.location.hash.substring(1))
            );

        const expected_state = window.sessionStorage.getItem("expected_state");
        if (!state || expected_state !== state) {
            setError("Unexpected state");
            return;
        }

        if (error || error_description) {
            setError(`Error: ${error} (${error_description})`);
            return;
        }

        if (code) {
            const {client_id, token_endpoint} = config[provider];
            const code_verifier = window.sessionStorage.getItem("code_verifier");
            const payload = {
                grant_type: "authorization_code",
                code,
                client_id,
                code_verifier,
            };
            const res = await fetch(token_endpoint, {
                method: "POST",
                body: new URLSearchParams(payload),
            });
            if (!res.ok) {
                setError(`Failed to fetch token ${res.status}: ${await res.text()}`);
                return;
            }
            const {access_token} = await res.json();
            await registerLogin(provider, {access_token});
            reload();
            console.log(window.location.href.toString())
            navigate("/");
            return;
        }

        if (!access_token) {
            setError("Missing access_token");
            return;
        }

        await registerLogin(provider, {access_token});
        reload();
        navigate("/");
    }, []);

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

    return <h1>Please wait...</h1>;
}

export function LogInPage({config, reload}) {
    return (
        <Routes>
            <Route path={"/"} element={<StartLogin config={config}/>}/>
            <Route
                path={"/:provider/callback"}
                element={<LoginCallback config={config} reload={reload}/>}/>
        </Routes>
    )
}

export function LogInCallback() {
    const navigate = useNavigate()
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

        navigate("/login/google/callback");
    }, [])

    return <h1>Please wait...</h1>

}