import { useState } from "react";
import validateForm from "../utils/validate";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import userAvatar from "/userAvatar.png";
import { CLOUDINARY_API_URL } from "../utils/constants";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const uploadImageToCloudinary = async (event) => {
        setErrorMessage(null);
        const { files } = event.target;
        //extracting the first image
        const file = files[0];
        if (!file) {
            //doesn't work if the user presses cancel first time
            setErrorMessage("Please Select a Profile Pic");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "preset_profile_pics");

            const response = await fetch(CLOUDINARY_API_URL, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            setProfilePic(result.secure_url);
        } catch (err) {
            console.log("error");
            setErrorMessage(err.message);
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        const result = validateForm(emailAddress, password);
        if (result) {
            setErrorMessage(result);
            return;
        }
        try {
            //create user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                emailAddress,
                password
            );
            const { uid } = userCredential.user;
            //create a document with specific id inside users collection
            await setDoc(doc(db, "users", uid), {
                username: userName,
                email: emailAddress,
                id: uid,
                blockList: [],
            });
            //create a document with specific id(uid) inside userchats collection
            await setDoc(doc(db, "userchats", uid), {
                chats: [],
            });
        } catch (err) {
            setErrorMessage(err.message);
        }
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
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create an Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSignUp}>
                        <div className="flex flex-col justify-center items-center">
                            <img
                                className="h-22 w-22"
                                src={profilePic ? profilePic : userAvatar}
                                alt="user avatar"
                            />
                            <input
                                className="border-1 text-white bg-indigo-600 rounded-md w-42"
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/png, image/jpeg"
                                onChange={uploadImageToCloudinary}
                            />
                        </div>
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
                            <div>
                                {errorMessage.includes("Password") ? (
                                    <>
                                        <span>Password not Valid!</span>
                                        <ul className="">
                                            <li>One uppercase letter</li>
                                            <li>One upecial character</li>
                                            <li>One number</li>
                                        </ul>
                                    </>
                                ) : (
                                    errorMessage
                                )}
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
