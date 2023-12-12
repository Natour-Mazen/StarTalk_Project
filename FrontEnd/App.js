import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/react-fontawesome';
import './assets/css/components/Button/AllButtons.css'
import {useContext, useEffect} from "react";

// Components
import About from "./pages/About/About";
import AddCitationModal from "./components/ForPages/AddCitations/AddCitationModal";
import AdminAddCitation from "./pages/AdminAddCitation/AdminAddCitation";
import AdminDeleteCitation from "./pages/AdminDeleteCitation/AdminDeleteCitation";
import AdminDisconnect from "./pages/AdminDisconnect/AdminDisconnect";
import Citations from "./pages/Citations/Citations";
import Citation from "./pages/Citation/Citation";
import NotFound from "./pages/NotFound/NotFound";
import Profile from  "./pages/Profile/Profile"
import {UserContext} from "./utils/UserAuthContext";

export default function App()
{

    const { isAuthenticated, role, fetchUserAfterLoginData} = useContext(UserContext);

    useEffect(() => {
        fetchUserAfterLoginData();
    }, []);

    return (
        isAuthenticated !== null &&
        <Routes>
            <Route path="/" element={<Citations />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            {
                (isAuthenticated === true && (role === 'ROLE_USER' || role === 'ROLE_ADMIN')) &&
                (
                    <>
                        <Route path="/citation/:id" element={<Citation />} />
                        <Route path="/profile" element={<Profile/>} />
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