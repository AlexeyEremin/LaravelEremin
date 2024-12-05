import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, user, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPassword('');
            console.log('User data set:', user);
        }
    }, [user]);

    useEffect(() => {
        if (!isOpen) {
            setName('');
            setEmail('');
            setPassword('');
            console.log('Modal closed, state reset');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            onSave({ ...user, name, email, password });
        }
        onClose();
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div style={modalStyle} onClick={handleBackgroundClick}>
            <div style={modalContentStyle}>
                <h2>Редактировать пользователя</h2>
                <form onSubmit={handleSubmit}>
                    <label style={{marginRight:"20px"}}>
                        Имя:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label style={{marginRight:"20px"}}>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label style={{marginRight:"20px"}}>
                        Новый пароль:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password'/>
                    </label>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Закрыть</button>
                </form>
            </div>
        </div>
    );
};

const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

export default Modal;
