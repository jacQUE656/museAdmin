import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { songsAPI } from "../services/ApiService";
import { Clock, Disc3, Image, Music, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from '../context/AuthContext';

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
    <DashboardLayout activeMenu="List Song" >
       {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
        ) : (
              <div className="p-6">
                    {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Songs Library
          </h1>
          <p className="text-gray-600">Manage your song collection</p>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-[#3be477] to-[#2dd865] px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center text-white font-semibold">
              <div className="col-span-2 flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>Cover</span>
              </div>
              <div className="col-span-3">Song title</div>
              <div className="col-span-3 flex items-center gap-2">
                <Disc3 className="w-4 h-4" />
                <span>Album</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Duration</span>
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
                <p className="text-gray-500 text-lg">No songs available yet.</p>
                <p className="text-gray-400 text-sm">Add songs to get started.</p>
              </div>
            ) : (
              data.map((song, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                  {/* SONG image */}
                  <div className="col-span-2">
                    <div className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                      <img src={song.image} alt={song.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  {/* SONG NAME */}
                  <div className="col-span-3">
                    <p className="font-medium text-gray-900 truncate">
                      {song.name}
                    </p>
                  </div>
                  {/* SONG ALBUM */}
                  <div className="col-span-3">
                    <p className="text-gray-600 truncate">
                      {song.album}
                    </p>
                  </div>
                  {/* SONG DURATION */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {song.duration}
                    </span>
                  </div>
                  {/* ACTION BUTTON */}
                  <div className="col-span-2 flex justify-center">
                    <button
                    onClick={()=>removeSong(song.id)}
                      title="Delete song"
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
                Total Songs :_
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