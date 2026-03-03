import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import AddSong from "./AddSong";
import ListSong from './ListAlbum';
import AddAlbum from './AddAlbum';
import ListAlbum from './ListAlbum';
import ListUsers from './ListUsers';
import CreateAdmin from './CreateAdmin';
const Display = () => {

    return (
        <>
            <Routes>
                <Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/add-song" element={<AddSong />} />
                    <Route path="/list-songs" element={<ListSong />} />
                    <Route path="/add-album" element={<AddAlbum />} />
                    <Route path="/list-albums" element={<ListAlbum />} />
                    <Route path='/user' element={<ListUsers />} />
                    <Route path='/create-admin' element={<CreateAdmin />} />
                </Route>
            </Routes>
        </>
    );
};

export default memo(Display);