import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { albumsAPI } from "../services/ApiService";
import toast from "react-hot-toast";
import { FileText, Image, ImageIcon, Palette, Trash, Trash2 } from "lucide-react";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await albumsAPI.list();
      setData(response.data.albums);
    } catch (error) {
      toast.error("Failed to load albums");
    } finally {
      setLoading(true);
    }
  }
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <DashboardLayout activeMenu="List Album" >
      <div className="p-6">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Albums Library
          </h1>
          <p className="text-gray-600">Manage your album collection</p>
        </div>
        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-[#3be477] to-[#2dd865] px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center text-white font-semibold">
              <div className="col-span-2 flex items-center gap-2">
                <Image className="w-4 h-4" />
                <span>Cover</span>
              </div>
              <div className="col-span-3">Album Name</div>
              <div className="col-span-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Description</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                <span>Theme</span>
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
                <p className="text-gray-500 text-lg">No albums available yet.</p>
                <p className="text-gray-400 text-sm">Add albums to get started.</p>
              </div>
            ) : (
              data.map((album, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                  {/* Album image */}
                  <div className="col-span-2">
                    <div className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                      <img src={album.imageUrl} alt={album.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  {/* ALBUM NAME */}
                  <div className="col-span-3">
                    <p className="font-medium text-gray-900 truncate">
                      {album.name}
                    </p>
                  </div>
                  {/* ALBUM DESCRIPTION */}
                  <div className="col-span-3">
                    <p className="text-gray-600 truncate">
                      {album.description || "No description"}
                    </p>
                  </div>
                  {/* ALBUM COLOR */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: album.bgColor }}
                        title={`Theme color: ${album.bgColor}`}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm">
                      </div>
                      <span className="text-xs text-gray-500 font-mono">
                        {album.bgColor}
                      </span>
                    </div>
                  </div>
                  {/* ACTION BUTTON */}
                  <div className="col-span-2 flex justify-center">
                    <button
                    title="Delete Album"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200">
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"/>
                    </button>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* FOOTER */}

      </div>
    </DashboardLayout>
  );
};

export default ListAlbum;