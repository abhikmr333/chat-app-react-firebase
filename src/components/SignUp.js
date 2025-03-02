import { useState } from "react";
import validateForm from "../utils/validate";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSignUp = (event) => {
        event.preventDefault();
        const result = validateForm(emailAddress, password);
        if (result) setErrorMessage(result);
        //else signup
    };

    const handleUserName = (event) => {
        const { value } = event.target;
        setUserName(value);
    };
    const handleEmailAddress = (event) => {
        if (errorMessage) setErrorMessage(null);
        const { value } = event.target;
        setEmailAddress(value);
    };
    const handlePassword = (event) => {
        if (errorMessage) setErrorMessage(null);
        const { value } = event.target;
        setPassword(value);
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create an Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={handleUserName}
                                    value={userName}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={handleEmailAddress}
                                    value={emailAddress}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={handlePassword}
                                    value={password}
                                />
                            </div>
                        </div>
                        {errorMessage && (
                            <p>
                                {errorMessage.includes("Password") ? (
                                    <>
                                        <h1>Password not Valid!</h1>
                                        <ul className="">
                                            <li>One uppercase letter</li>
                                            <li>One upecial character</li>
                                            <li>One number</li>
                                        </ul>
                                    </>
                                ) : (
                                    errorMessage
                                )}
                            </p>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
