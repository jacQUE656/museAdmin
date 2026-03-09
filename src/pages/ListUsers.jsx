import { memo, useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Mail, Trash2, Users } from 'lucide-react';
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
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const response = await userAPI.delete(id);
            if (response.status === 204) {
                toast.success("User deleted");
                await fetchUsers();
            }
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    useEffect(() => {
        if (admin) fetchUsers();
    }, []);

    return admin ? (
        <DashboardLayout activeMenu="List User">
            {loading ? (
                <div className="grid place-items-center min-h-[50vh]">
                    <div className="w-12 h-12 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="p-4 sm:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Library</h1>
                        <p className="text-gray-600">Manage your registered users</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Desktop Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-700 px-6 py-4 text-white font-semibold">
                            <div className="col-span-2">Firstname</div>
                            <div className="col-span-3">Lastname</div>
                            <div className="col-span-3">Email</div>
                            <div className="col-span-2">Role</div>
                            <div className="col-span-2 text-center">Action</div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {data.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">No users found.</div>
                            ) : (
                                data.map((user) => (
                                    <div key={user.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                        {/* Mobile view: Stacked info */}
                                        <div className="md:col-span-2 font-bold text-gray-900">{user.firstname}</div>
                                        <div className="md:col-span-3 text-gray-700">{user.lastname}</div>
                                        <div className="md:col-span-3 flex items-center gap-2 text-gray-600 text-sm">
                                            <Mail className="w-3 h-3 md:hidden" /> {user.email}
                                        </div>
                                        <div className="md:col-span-2">
                                            <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {user.role}
                                            </span>
                                        </div>
                                        
                                        {/* Action Button */}
                                        <div className="absolute right-4 md:static md:col-span-2 flex justify-center">
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
            <div className="text-center text-white">
                <div className='text-2xl font-bold mb-4'>Access Denied</div>
                <p>You need admin privileges to access this page.</p>
            </div>
        </div>
    );
};

export default memo(ListUsers);