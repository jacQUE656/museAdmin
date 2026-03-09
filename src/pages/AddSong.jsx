import DashboardLayout from "../layout/DashboardLayout";
import { useEffect, useState } from "react";
import { Check, Image, Music } from "lucide-react";
import { albumsAPI, songsAPI } from "../services/ApiService";
import toast from "react-hot-toast";


const AddSong = () => {

  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState("none");
  const [albumData, setAlbumData] = useState([]);
  const admin = localStorage.getItem("adminUser");


 const onSubmitHandler = async (e) => { 
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      const request = {
        name,
        description,
        album

      }
      formData.append("request" , JSON.stringify(request));
      formData.append("audio" ,song);
        formData.append("image" ,image);
      const response = await songsAPI.add(formData);
      if (response.status === 201) {
        toast.success("Song successfully added!");
        setName("");
         setDescription("");
          setImage(false);
          setAlbum("none");
          setSong(false);
      }else{
        toast.error('Something went wrong while adding song pleae try again')
      }

    } catch (error) {
              toast.error('Error adding song pleae try again')

    }finally{
      setLoading(false);
    }
  }
  const loadAlbumData = async () => {
    try {
      const response = await albumsAPI.list();
      setAlbumData(response.data.albums)

    } catch (error) {
      toast.error("Failed to load albums");
    }
  }
  useEffect(() => {
    if (admin) {
      loadAlbumData();
    }

  }, [])

  return admin ? (
   <>
   <DashboardLayout activeMenu="Add Song">
      {loading ? (
        <div className="grid place-items-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form className="flex flex-col gap-6 text-gray-700 mt-5 p-2" onSubmit={onSubmitHandler}>
          
          {/* UPLOAD SECTIONS */}
          <div className="flex flex-wrap gap-6">
            {/* SONG UPLOAD */}
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">Upload Song</p>
              <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" accept="audio/*" hidden />
              <label htmlFor="song" className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-green-500 transition-all bg-gray-50">
                {song ? <Check className="h-8 w-8 text-green-500" /> : <Music className="h-8 w-8 text-gray-400" />}
              </label>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">Upload Image</p>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
              <label htmlFor="image" className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-green-500 transition-all bg-gray-50 overflow-hidden">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Image className="h-8 w-8 text-gray-400" />
                )}
              </label>
            </div>
          </div>

          {/* INPUT FIELDS */}
          <div className="flex flex-col gap-2 w-full max-w-[500px]">
            <p className="font-medium text-sm">Song Name</p>
            <input 
              type="text"
              className="bg-transparent outline-none border border-gray-300 rounded p-3 focus:border-green-600 transition-all"
              placeholder="Enter song name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full max-w-[500px]">
            <p className="font-medium text-sm">Song Description</p>
            <input 
              type="text"
              className="bg-transparent outline-none border border-gray-300 rounded p-3 focus:border-green-600 transition-all"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* ALBUM SELECT */}
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Album</p>
            <select
              defaultValue={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="bg-transparent outline-none border border-gray-300 rounded p-3 w-full max-w-[200px] focus:border-green-600 cursor-pointer"
            >
              <option value="none">None</option>
              {albumData.map((album, index) => (
                <option value={album.name} key={index}>{album.name}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full max-w-[500px] bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md"
          >
            ADD SONG
          </button>
        </form>
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

export default AddSong;