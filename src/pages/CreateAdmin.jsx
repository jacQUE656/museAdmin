import { memo, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import toast from 'react-hot-toast';
import { postAdmin } from '../services/ApiService';

const CreateAdmin = () => {
    const admin = localStorage.getItem("adminUser");
    const [formData, setFormData] = useState({
        firstname: '', lastname: '', phonenumber: '', email: '', password: '', confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (Object.values(formData).some(field => field === '')) {
            toast.error('Please fill in all fields');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        setLoading(true);
        try {
            const { firstname, lastname, phonenumber, email, password } = formData;
            const result = await postAdmin(firstname, lastname, phonenumber, email, password);
            if (result.success) {
                toast.success("Admin successfully created!");
                setFormData({ firstname: '', lastname: '', phonenumber: '', email: '', password: '', confirmPassword: '' });
            } else {
                toast.error('Failed to create admin');
            }
        } catch (err) {
            toast.error('Server error occurred');
        } finally {
            setLoading(false);
        }
    };

    return admin ? (
        <DashboardLayout activeMenu="Create Admin">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Admin</h2>
                        
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {error && <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">{error}</div>}
                            
                            {['firstname', 'lastname', 'phonenumber', 'email'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">{field}</label>
                                    <input 
                                        name={field} 
                                        type={field === 'email' ? 'email' : 'text'}
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                        placeholder={`Enter ${field}`}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}

                            {['password', 'confirmPassword'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                                        {field === 'confirmPassword' ? 'Confirm Password' : 'Password'}
                                    </label>
                                    <input 
                                        name={field} 
                                        type="password"
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                        placeholder="••••••••"
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}

                            <button
                                disabled={loading}
                                className="w-full py-3 mt-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-all disabled:opacity-50"
                            >
                                {loading ? "Creating..." : "Create Admin"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    ) : (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="text-center text-white">
                <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                <p>You need admin privileges to access this page.</p>
            </div>
        </div>
    );
};

export default memo(CreateAdmin);