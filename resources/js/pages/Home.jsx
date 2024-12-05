import { useState } from "react";

export default function Home () {

    const [form, setForm] = useState({
        email:'',
        password: '',
    })

    const emailHandler = (e) => {
        setForm((prev) => ({
            ...prev,
            email: e.target.value.trim()
        }))
    }

    const passwordHandler = (e) => {
        setForm((prev) => ({
            ...prev,
            password: e.target.value.trim()
        }))
    }

    const buttonHandler = async (e) => {
        e.preventDefault();
        const respons = await fetch('/api/app/check/user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': form.email,
                'password': form.password,
            }),
        })
        console.log(respons);

        const data = respons.json();
        console.log(data);
        if(respons.ok){
            setForm({
                email: '',
                password: '',
            })
        }
        setForm({
            email: form.email,
            password: '',
        });
    }

    return (
        <>
            <form>
                <p>
                    <label htmlFor="email">Почта</label>
                    <input type="email" name="email" id="email" value={form.email} onChange={emailHandler} />
                </p>
                <p>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" name="password" id="password" value={form.password} onChange={passwordHandler} />
                </p>
                <button type="submit" onClick={buttonHandler}>Отправить</button>
            </form>
        </>
    );
}
