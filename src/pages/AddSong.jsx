import DashboardLayout from "../layout/DashboardLayout";
import { useState } from "react";
import { Image } from "lucide-react";


const AddSong = () => {

  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState("none");
  const [albumData , setAlbumData] = useState([]);

  const onSubmitHandler = (e) => { }


  return (
    <DashboardLayout activeMenu="Add Song" >
    {/* this div become the children in the dashboardlayout */}
    
    </DashboardLayout>
  );
};

export default AddSong;