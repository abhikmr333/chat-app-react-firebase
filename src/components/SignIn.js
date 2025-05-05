import { useState } from "react";
import validateForm from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Link } from "react-router";

const SignIn = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

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

    const handleSignIn = async (event) => {
        event.preventDefault();
        const result = validateForm(emailAddress, password);
        if (result) {
            setErrorMessage(result);
            return;
        }
        //signin the user
        try {
            await signInWithEmailAndPassword(auth, emailAddress, password);
            //signedin
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <>
            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#f9f5d7]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#8f3f7f]">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-md/6 font-medium text-[#504945]"
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8f3f71] sm:text-sm/6"
                                    onChange={handleEmailAddress}
                                    value={emailAddress}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-md/6 font-medium text-[#504945]"
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8f3f71] sm:text-sm/6"
                                    onChange={handlePassword}
                                    value={password}
                                />
                            </div>
                        </div>
                        {errorMessage && <p>{errorMessage}</p>}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#282828] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#504945]"
                                onClick={handleSignIn}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
                <div className="self-center p-2 text-[#689d6a]">
                    Don't have an account?
                    <Link
                        className="text-[#458588] text-lg  border-b-[#458588] border-b-1 hover:text-[#076678]"
                        to="/signup"
                    >
                        create an account
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignIn;
