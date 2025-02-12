import React from "react";
import Title from "../components/Title";

const UserProfile = () => {
    return (
        <div>
            <div className='text-2xl flex justify-center items-center mt-5'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className="max-w-sm mx-auto p-4 bg-white shadow rounded-md mt-6">
                <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold">User Profile</h2>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2 text-sm bg-gray-100"
                            value="John Doe"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded p-2 text-sm bg-gray-100"
                            value="johndoe@example.com"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            className="w-full border rounded p-2 text-sm"
                            placeholder="Enter new password"
                        />
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">
                        Save
                    </button>
                    <button className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </div>
        </div>

    );
};

export default UserProfile;
