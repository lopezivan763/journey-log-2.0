import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-[#0c0a09] text-white">
      <div className="w-full sm:max-w-md px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#86c232]">Login</h2>
        <form onSubmit={handleFormSubmit} className="w-full max-w-md flex flex-col space-y-4 items-center sm:w-34">
          <div className="w-full">
            <label htmlFor="email" className="text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="bg-[#0c0a09] border border-[#86c232] rounded-md p-2 w-full text-[#86c232]"
            />
          </div>
          <div className='w-full'>
            <label htmlFor="password" className="text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              className="bg-[#0c0a09] border border-[#86c232] text-[#86c232] rounded-md p-2 w-full"
            />
          </div>
          <button className="text-white border border-[#86c232] font-bold py-2 px-4 rounded-md hover:bg-[#86c232] hover:text-[#0c0a09] " type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
