import React from 'react';

const LoginForm = ({ login }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username.trim() || !password.trim()) {
            return;
        }

        await login(username, password);
    }

    return (
        <form>
            <h2 className="mb-4">Log In</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mt-4">Log Me In</button>
        </form>
    );
};

export default LoginForm;