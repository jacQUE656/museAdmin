import DashboardLayout from "../layout/DashboardLayout";

const ListSong = () => {
  return (
     <DashboardLayout activeMenu = "List Song" >
    <div>List song</div> {/* this div become the children in the dashboardlayout */}
   </DashboardLayout>
  );
};

export default ListSong;