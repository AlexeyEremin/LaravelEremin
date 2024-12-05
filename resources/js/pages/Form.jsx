import { useState } from "react";

export default function Form() {
    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: '',
        role_id: '',
    });

    const buttonHandler = (e) => {
        e.preventDefault();
        let role_id = 0
        if(`${form.role_id.toLowerCase()}` === "admin"){
            role_id = 1;
        }
        else if(form.role_id.toLowerCase() === "client"){
            role_id = 2;
        }
        else{
            role_id = 3;
        }
        console.log(role_id)
        fetch('/api/app',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": form.userName,
                "email": form.email,
                "password": form.password,
                "role_id": role_id,
            })
        })
        .then((response) => {
            if(response.status===404){
                console.log("Ошибка, он дурак");
                alert('Ошибка, ты дурак');
            }
            else{
                console.log(response)
            }
            return response.json();
        })
        .then((data) => {
            console.log('User created: ' + JSON.stringify(data));
            document.cookie = `id=${data.id}; path=/; max-age=3600`;
            setForm(()=>({
                userName: '',
                email: '',
                password: '',
                role_id: '',
            }))
        });
    };

    const nameHandler = (e) => {
        setForm((prev) => ({
            ...prev,
            userName: e.target.value.trim(),
        }));
    };

    const emailHandler = (e) => {
        setForm((prev) => ({
            ...prev,
            email: e.target.value.trim(),
        }));
    };

    const passwordHandler = (e) => {
        setForm((prev) => ({
            ...prev,
            password: e.target.value.trim(),
        }));
    };

    const roleHandler = (e) => {
        setForm((prev) => ({
            ...prev,
            role_id: e.target.value.trim(),
        }));
    };

    return (
        <>
            <form>
                <p>
                    <label htmlFor="name">Имя</label>
                    <input type="text" name="name" id="name" value={form.userName} onChange={nameHandler} />
                </p>
                <p>
                    <label htmlFor="email">Почта</label>
                    <input type="email" name="email" id="email" value={form.email} onChange={emailHandler} />
                </p>
                <p>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" name="password" id="password" value={form.password} onChange={passwordHandler} />
                </p>
                <p>
                    <label htmlFor="role">Ваш код:</label>
                    <input type="text" name="role" id="role" value={form.role_id} onChange={roleHandler} />
                </p>
                <button type="submit" onClick={buttonHandler}>Отправить</button>
            </form>

            <div>
                <p>Ваш ответ:</p>
                <h2>Имя: {form.userName}</h2>
                <h2>Почта: {form.email}</h2>
                <h2>Пароль: {form.password}</h2>
            </div>
        </>
    );
}
