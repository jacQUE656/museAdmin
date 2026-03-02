import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Image } from "lucide-react";


const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = (e) => { }


  return (
    <DashboardLayout activeMenu="Add Album" >
      {/* this  become the children in the dashboardlayout */}
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form className="flex flex-col items-start gap-8 text-gray-600 mt-5" onSubmit={onSubmitHandler}>
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

          {/* ALBUM NAME */}
          <div className="flex flex-col gap-2.5">
            <p>Album name</p>
            <input type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw , 250px)]"
              placeholder="type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* ALBUM DESCRIPTION */}
          <div className="flex flex-col gap-2.5">
            <p>Album description</p>
            <input type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw , 250px)]"
              placeholder="type here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* ALBUM BG COLOR */}
          <div className="flex flex-col gap-3">
            <p>Background colour</p>
            <input type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          {/* SUBMIT BUTTON */}
                <button type="submit" className="text-base bg-[#3be477] text-white py-2.5 px-14 cursor-pointer">
                  ADD
                </button>
        </form>
      )}
    </DashboardLayout>
  )
}

export default AddAlbum;