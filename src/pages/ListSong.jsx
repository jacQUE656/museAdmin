import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { songsAPI } from "../services/ApiService";
import { Clock, Disc3, Image, Music, Trash2 } from "lucide-react";
import toast from "react-hot-toast";


const ListSong = () => {

  const [data, setData] = useState([]);
  const admin = localStorage.getItem("adminUser");
  const [loading, setLoading] = useState(false);


  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await songsAPI.list();
      setData(response.data.songs);
    } catch (error) {
      toast.error("Failed to load albums");
    } finally {
      setLoading(false);
    }
  }

  const removeSong = async (id) => {
    try {
      const response = await songsAPI.remove(id);
      if (response.status === 204) {
        toast.success("Song deleted")
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Failed to delete song")
    }
  }
  useEffect(() => {
    if (admin) {
      fetchSongs();
    }
  }, []);

  

  return admin ? (
  <>
 <DashboardLayout activeMenu="List Song">
      {loading ? (
        <div className="grid place-items-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 w-full">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Songs Library</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your song collection</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* DESKTOP HEADER (Hidden on mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-4 items-center bg-green-500 px-6 py-4 text-white font-semibold">
              <div className="col-span-2">Cover</div>
              <div className="col-span-3">Song Title</div>
              <div className="col-span-3">Album</div>
              <div className="col-span-2">Duration</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            {/* BODY */}
            <div className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No songs available.</div>
              ) : (
                data.map((song) => (
                  <div key={song.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    {/* Cover & Mobile Info */}
                    <div className="flex items-center gap-4 col-span-2">
                      <img src={song.image} alt={song.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                      <div className="md:hidden flex flex-col">
                        <span className="font-bold text-gray-900">{song.name}</span>
                        <span className="text-xs text-gray-500">{song.album}</span>
                      </div>
                    </div>

                    {/* Desktop Columns (Hidden on mobile) */}
                    <div className="hidden md:block col-span-3 font-medium text-gray-900 truncate">{song.name}</div>
                    <div className="hidden md:block col-span-3 text-gray-600 text-sm truncate">{song.album}</div>
                    <div className="hidden md:block col-span-2">
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">{song.duration}</span>
                    </div>

                    {/* Action */}
                    <div className="absolute right-4 md:static col-span-2 flex justify-end md:justify-center">
                      <button
                        onClick={() => removeSong(song.id)}
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
  ): (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
          <div className='text-2xl font-bold text-white mb-4'>Access Denied</div>
    <p className="text-white text-lg">You need admin privilages to access this page</p>
        </div>
      </div>
  )
};

export default ListSong;