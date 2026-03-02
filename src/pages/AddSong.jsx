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
    loadAlbumData();

  }, [])

  return (
    <DashboardLayout activeMenu="Add Song" >
      {/* this div become the children in the dashboardlayout */}
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form className="flex flex-col items-start gap-8 text-gray-600 mt-5" onSubmit={onSubmitHandler}>
          <div className="flex gap-8">

            {/* ADDING SONG */}
            <div className="flex flex-col gap-4">
              <p>Upload song</p>
              <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" accept="audio/" hidden />
              <label htmlFor="song" className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden">
                {song ? (
                  <Check className="h-8 w-8 text-gray-500" />
                ) : (<Music className="h-8 w-8 text-gray-500" />)}
              </label>
            </div>

            {/* ADDING IMAGE */}
            <div className="flex flex-col gap-4">
              <p>Upload Image</p>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/" hidden />
              <label htmlFor="image" className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (<Image className="h-8 w-8 text-gray-500" />)}
              </label>
            </div>
          </div>

          {/* ALBUM NAME */}
          <div className="flex flex-col gap-2.5">
            <p>Song name</p>
            <input type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw , 250px)]"
              placeholder="type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* SONg DESCRIPTION */}
          <div className="flex flex-col gap-2.5">
            <p>Song description</p>
            <input type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw , 250px)]"
              placeholder="type here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* ALBUMS */}
          <div className="flex flex-col gap-2.5">
            <p>Album</p>
            <select
              defaultValue={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="bg-transparent outline-green-600 border-3 border-gray-400 p-2.5 w-[150px]">
              <option value="none">None</option>
              {albumData.map((album, index) => (
                <option value={album.name} key={index}>{album.name}</option>
              ))}
            </select>
          </div>


          {/* SUBMIT BUTTON */}
          <button type="submit" className="text-base bg-[#3be477] text-white py-2.5 px-14 cursor-pointer">
            ADD
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default AddSong;