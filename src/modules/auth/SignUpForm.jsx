import React from 'react';

const SignUpForm = ({ signup }) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const form = React.useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.current.checkValidity()) {
            return;
        }

        await signup(username, email, password);
    }

    return (
        <form ref={form}>
            <h2 className="mb-4">Sign Up</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" required className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mt-4">Sign Me Up</button>
        </form>
    );
};

export default SignUpForm;