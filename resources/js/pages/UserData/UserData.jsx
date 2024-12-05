import React, { useEffect, useState } from 'react';
import Modal from './Modal/Modal';

const getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[2]) : null;
};

const EditButton = ({ onClick }) => (
    <button
        style={{
            background: "#fff",
            boxShadow: "none",
            border: "2px solid black",
            borderRadius: "50px",
            cursor: "pointer"
        }}
        onClick={onClick}
    >
        Edit
    </button>
);

export default function UserData() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const userId = getCookieValue('id');
    const [userRole, setUserRole] = useState('');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/app');
                if (!response.ok) {
                    throw new Error('Network response was not ok, Users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(`Ошибка загрузки пользователей: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserRole = async () => {
            try{
                console.log(userId)
                const response = await fetch(`/api/app/get/role/${в}`)
                if (!response.ok) throw new Error('Network response was not ok, Role')
                const data = await response.json();
                setUserRole(data.role)
            } catch (error) {
                setError(`Ошибка получения роли ${error.message}`)
            }
        }

        fetchUserRole();
        fetchUsers();
    }, [userId]);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleSave = async (updatedUser) => {
        const changes = {};

        if (selectedUser.name !== updatedUser.name) {
            changes.name = updatedUser.name;
        }
        if (selectedUser.email !== updatedUser.email) {
            changes.email = updatedUser.email;
        }

        const checkPassword = await fetch(`/api/app/check/checkPassword/${selectedUser.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                current_password: updatedUser.password,
            }),
        });
        console.log(checkPassword)
        if (checkPassword.ok) {
            alert("Пароль изменен");
            changes.password = updatedUser.password;
        } else {
            alert("Пароль уже используется");
        }

        if (Object.keys(changes).length > 0) {
            try {
                const response = await fetch(`/api/app/${selectedUser.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(changes),
                });
                if (!response.ok) {
                    throw new Error('Ошибка при обновлении данных');
                }
                setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...changes } : user)));
            } catch (error) {
                setError(`Ошибка обновления данных: ${error.message}`);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {userRole !== 'user' && (
                <>
                    <ul style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "90vw", height: "auto" }}>
                        {users.map(user => (
                            <li key={user.id} style={{ display: 'flex', justifyContent: "space-between", marginBottom: "10px" }}>
                                <>{user.name} {user.email}</>
                                {userRole==='admin' && <EditButton onClick={() => handleEditClick(user)} />}
                            </li>
                        ))}
                    </ul>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setModalOpen(false);
                            setSelectedUser(null);
                        }}
                        user={selectedUser}
                        onSave={handleSave}
                    />
                </>
            )}
            {userRole==='user' && (<h1>У вас нету доступа к данной странице)</h1>)}
        </div>
    );
}
