import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Image } from "lucide-react";
import { albumsAPI } from "../services/ApiService";
import toast from "react-hot-toast";


const AddAlbum = () => {


  const [image, setImage] = useState(false);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const admin = localStorage.getItem("adminUser");

  const onSubmitHandler = async (e) => { 
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      const request = {
        name,
        description,
        bgColor : color

      }
      formData.append("request" , JSON.stringify(request));
      formData.append("file" ,image);
      const response = await albumsAPI.add(formData);
      if (response.status === 201) {
        toast.success("Album successfully added!");
        setName("");
         setDescription("");
          setImage(false);
      }else{
        toast.error('Something went wrong while adding Album pleae try again')
      }

    } catch (error) {
              toast.error('Error adding Album pleae try again')

    }finally{
      setLoading(false);
    }
  }

return admin ? (
    <DashboardLayout activeMenu="Add Album">
      {loading ? (
        <div className="grid place-items-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form className="flex flex-col gap-6 text-gray-700 mt-5 p-2" onSubmit={onSubmitHandler}>
          
          {/* UPLOAD IMAGE */}
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Upload Image</p>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
            <label htmlFor="image" className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-green-500 transition-all overflow-hidden bg-gray-50">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Image className="h-8 w-8 text-gray-400" />
              )}
            </label>
          </div>

          {/* ALBUM NAME */}
          <div className="flex flex-col gap-2 w-full max-w-[500px]">
            <p className="font-medium text-sm">Album Name</p>
            <input 
              type="text"
              className="bg-transparent outline-none border border-gray-300 rounded p-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
              placeholder="Enter album name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* ALBUM DESCRIPTION */}
          <div className="flex flex-col gap-2 w-full max-w-[500px]">
            <p className="font-medium text-sm">Album Description</p>
            <input 
              type="text"
              className="bg-transparent outline-none border border-gray-300 rounded p-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* BACKGROUND COLOR */}
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Background Colour</p>
            <input 
              type="color"
              className="h-10 w-20 cursor-pointer rounded border-none"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            className="w-full max-w-[500px] bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md"
          >
            ADD ALBUM
          </button>
        </form>
      )}
    </DashboardLayout>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className='text-2xl font-bold text-white mb-2'>Access Denied</div>
        <p className="text-gray-300">You need admin privileges to access this page.</p>
      </div>
    </div>
  );
};
export default AddAlbum;