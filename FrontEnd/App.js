import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/react-fontawesome';
import {useContext} from "react";

// Components
import About from "./pages/About/About";
import AddCitation from "./pages/AddCitation/AddCitation";
import AdminAddCitation from "./pages/AdminAddCitation/AdminAddCitation";
import AdminDeleteCitation from "./pages/AdminDeleteCitation/AdminDeleteCitation";
import AdminDisconnect from "./pages/AdminDisconnect/AdminDisconnect";
import Citations from "./pages/Citations/Citations";
import Citation from "./pages/Citation/Citation";
import Bookmark from "./pages/Bookmark/Bookmark";
import NotFound from "./pages/NotFound/NotFound";
import Profile from  "./pages/Profile/Profile"
import {UserContext} from "./utils/UserAuthContext";

export default function App()
{
    const { isAuthenticated, role } = useContext(UserContext);

  return (
    <Routes>
        <Route path="/" element={<Citations />} />
        <Route path="/about" element={<About />} />
        <Route path="/citation/:id" element={<Citation />} />
        <Route path="*" element={<NotFound />} />
        {
            (isAuthenticated === true && (role === 'ROLE_USER' || role === 'ROLE_ADMIN')) &&
            (
                <>
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/bookmark" element={<Bookmark />} />
                    <Route path="/addCitation" element={<AddCitation />} />
                </>
            )
        }
        {
            (isAuthenticated === true && role === 'ROLE_ADMIN') &&
            (
                <>
                    <Route path="/admin/add" element={<AdminAddCitation />} />
                    <Route path="/admin/delete" element={<AdminDeleteCitation />} />
                    <Route path="/admin/disconnection" element={<AdminDisconnect />} />
                </>
            )
        }
    </Routes>
  );
}