import { memo, useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Image, Mail, Trash2 } from 'lucide-react';
import { userAPI } from '../services/ApiService';
import toast from 'react-hot-toast';

const ListUsers = () => {

    const [data, setData] = useState([]);
    const admin = localStorage.getItem("adminUser");
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await userAPI.list();
            setData(response.data.user);
        } catch (error) {
            toast.error("Failed to load albums");
        } finally {
            setLoading(false);
        }
    }
      const deleteUser = async (id) => {
          if(!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await userAPI.delete(id);
      if (response.status === 204) {
        toast.success("User deleted")
        await fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to delete user")
    }
  }
  useEffect(() => {
    if (admin) {
      fetchUsers();
    }
  }, []);



    return admin ? (
        <>
            <DashboardLayout activeMenu="List User" >
                {loading ? (
                    <div className="grid place-items-center min-h-[80vh]">
                        <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="p-6">
                        {/* Header section */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                User Library
                            </h1>
                            <p className="text-gray-600">Manage all user </p>
                        </div>

                        {/* TABLE CONTAINER */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                            {/* TABLE HEADER */}
                            <div className="bg-gray-700 to-[#2dd865] px-6 py-4">
                                <div className="grid grid-cols-12 gap-4 items-center text-white font-semibold">
                                    <div className="col-span-2 flex items-center gap-2">
                                       <p>Firstname</p>
                                    </div>
                                    <div className="col-span-3">Lastname</div>
                                    <div className="col-span-3 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>Email</span>
                                    </div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <span>Role</span>
                                    </div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        Action
                                    </div>
                                </div>
                            </div>

                            {/* TABLE BODY */}
                            <div className="divide-y divide-gray-100">
                                {data.length === 0 ? (
                                    <div className="px-6 py-12 text-center">
                                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg">No user available yet.</p>
                                    </div>
                                ) : (
                                    data.map((user, index) => (
                                        <div key={index} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                                            {/*  FIRST NAME */}
                                         <div className="col-span-2">
                                                <p className="font-medium text-gray-900 truncate">
                                                    {user.firstname}
                                                </p>
                                            </div>
                                            {/* LAST NAME */}
                                            <div className="col-span-3">
                                                <p className="font-medium text-gray-900 truncate">
                                                    {user.lastname}
                                                </p>
                                            </div>
                                            {/* USER EMAIL */}
                                            <div className="col-span-3">
                                                <p className="text-gray-600 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            {/* USER ROLE */}
                                            <div className="col-span-2">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-green-800">
                                                    {user.role}
                                                </span>
                                            </div>
                                            {/* ACTION BUTTON */}
                                            <div className="col-span-2 flex justify-center">
                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    title="Delete user"
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200">
                                                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}

                            </div>
                        </div>
                        {/* FOOTER */}
                        {data.length > 0 && (
                            <div className="mt-6 bg-gray-50 rounded-lg px-6 py-4">
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>
                                        Total Users :_
                                        <span className="font-semibold text-gray-900">
                                            {data.length}
                                        </span>
                                    </span>
                                    <span>
                                        Last updated
                                        <span className="font-semibold text-gray-900">_Just Now</span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                )}



            </DashboardLayout>
        </>
    ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <div className="text-center">
                <div className='text-2xl font-bold text-white mb-4'>Access Denied</div>
                <p className="text-white text-lg">You need admin privilages to access this page</p>
            </div>
        </div>
    )
};


export default memo(ListUsers);