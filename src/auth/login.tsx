import {InputField, Button} from '@dhis2/ui'
import {Controller, FormProvider, useForm} from "react-hook-form"
import {login, preserveCookies} from "./services/login";
import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useConfig} from "@dhis2/app-runtime";

export default function Login() {
    const form = useForm();
    const {baseUrl} = useConfig();
    const [loggingIn, setLoggingIn] = useState(false);
    const navigate = useNavigate();
    const onLogin = useCallback(
        async ({username, password}: any) => {
            setLoggingIn(true);
            const isLoggedIn = await login(username, password);

            if (isLoggedIn) {
                await preserveCookies(baseUrl);
                console.log('Logged in');
                navigate("/home");
            } else {
                alert("Invalid username or password");
            }
            setLoggingIn(false)
        },
        [navigate],
    );


    return (
        <FormProvider {...form}>
            <div style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{width: "30%", height: "50%", display: "flex", flexDirection: "column", gap: 16}}>
                    <h1>Login</h1>
                    <Controller
                        name="username"
                        render={({field, fieldState}) => (
                            <InputField
                                {...field}
                                error={fieldState.error}
                                validationText={fieldState.error?.message}
                                onChange={({value}: { value: string }) => field.onChange(value)} name="username"
                                label="Username"
                                type="text"
                            />
                        )}

                    />
                    <Controller
                        name="password"
                        render={({field, fieldState}) => (
                            <InputField
                                {...field}
                                error={fieldState.error}
                                validationText={fieldState.error?.message}
                                onChange={({value}: { value: string }) => field.onChange(value)} name="password"
                                label="Password"
                                type="password"
                            />
                        )}
                    />

                    <Button onClick={form.handleSubmit(onLogin)} disabled={loggingIn} loading={loggingIn}
                            primary>Login</Button>
                </div>
            </div>
        </FormProvider>
    )
}
