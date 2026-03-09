import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { albumsAPI } from "../services/ApiService";
import toast from "react-hot-toast";
import { FileText, Image, ImageIcon, Palette, Trash, Trash2 } from "lucide-react";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const admin = localStorage.getItem("adminUser");
  
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await albumsAPI.list();
      setData(response.data.albums);
    } catch (error) {
      toast.error("Failed to load albums");
    } finally {
      setLoading(false);
    }
  }
    const removeAlbum = async (id) => {
    try {
      const response = await albumsAPI.remove(id);
      if (response.status === 204) {
        toast.success("Album deleted")
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("album")
    }
  }
  useEffect(() => {
    if (admin) {
      fetchAlbums();
    }
  }, []);
  
  return admin ? (
<>
  <DashboardLayout activeMenu="List Album">
      {loading ? (
        <div className="grid place-items-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 w-full">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Albums Library</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your album collection</p>
          </div>

          {/* TABLE / CARD CONTAINER */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            
            {/* DESKTOP HEADER (Hidden on mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-4 items-center bg-green-500 px-6 py-4 text-white font-semibold">
              <div className="col-span-2">Cover</div>
              <div className="col-span-3">Album Name</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-2">Theme</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            {/* BODY */}
            <div className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No albums available.</div>
              ) : (
                data.map((album) => (
                  <div key={album.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    {/* Cover & Mobile Info */}
                    <div className="flex items-center gap-4 col-span-2">
                      <img src={album.imageUrl} alt={album.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                      <div className="md:hidden flex flex-col">
                        <span className="font-bold text-gray-900">{album.name}</span>
                        <span className="text-xs text-gray-500">{album.bgColor}</span>
                      </div>
                    </div>

                    {/* Desktop Columns (Hidden on mobile) */}
                    <div className="hidden md:block col-span-3 font-medium text-gray-900 truncate">{album.name}</div>
                    <div className="hidden md:block col-span-3 text-gray-600 text-sm truncate">{album.description || "No description"}</div>
                    <div className="hidden md:flex items-center gap-2 col-span-2">
                      <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: album.bgColor }}></div>
                      <span className="text-xs font-mono">{album.bgColor}</span>
                    </div>

                    {/* Action */}
                    <div className="absolute right-4 md:static col-span-2 flex justify-end md:justify-center">
                      <button
                        onClick={() => removeAlbum(album.id)}
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
</>
  ):(
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
          <div className='text-2xl font-bold text-white mb-4'>Access Denied</div>
    <p className="text-white text-lg">You need admin privilages to access this page</p>
        </div>
      </div>
  )
};

export default ListAlbum;