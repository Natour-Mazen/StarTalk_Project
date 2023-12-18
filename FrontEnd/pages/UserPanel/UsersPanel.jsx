import React, {useContext, useEffect, useRef, useState} from 'react';
import Base from "../../components/layout/Base";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import "../../assets/css/pages/UserPanel/UserPanel.css"
import {Divider} from "primereact/divider";
import AddCitationModal from '../../components/ForPages/AddCitations/AddCitationModal';
import {UserContext} from "../../utils/UserAuthContext";
import ButtonMenu from "../../components/Button/ButtonMenu";
import DeleteCitationModal from "../../components/ForPages/DeleteCitation/DeleteCitationModal";
import {ConfirmPopup} from "primereact/confirmpopup";
import { Toast } from 'primereact/toast';

export default function AdminUsers() {

    const { id , hand } = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rows, setRows] = useState(4);
    const [visible, setVisible] = useState(false);
    const [visibleDelModal, setVisibleDelModal] = useState(false);
    const [writernameToAdd, setWriternameToAdd] = useState('');
    const [userIdToEdit, setUserIdToEdit] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [disconnectButtonRef, setDisconnectButtonRef] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = (page, rows) => {
        axios.get(`/startalk-api/admin/users?page=${page + 1}&limit=${rows}`,{
            withCredentials : true,
        })
            .then(response => {
                setUsers(response.data.users);
                setTotalRecords(response.data.totalPages * rows);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        fetchUsers(currentPage, rows);
    }, [currentPage, rows]);

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <p>
                    {
                        id !== rowData._id ? (
                            <>
                                <Button icon={<FontAwesomeIcon icon={faPlus}/>} className="StartalkButton"
                                        onClick={() => addQuote(rowData)} title="Add a Citation to User"/>
                                <span className="m-1"/>
                                <Button icon={<FontAwesomeIcon icon={faTrash}/>} className="StartalkButton"
                                        onClick={() => deleteQuote(rowData)} title="Remove a Citation from User"/>
                                <span className="m-1"/>
                                <Button icon={<FontAwesomeIcon icon={faSignOutAlt}/>} className="StartalkButton"
                                        onClick={(e) => showDisconnectPopUp(rowData, e)}  title="Disconnect User"
                                        ref={disconnectButtonRef}
                                />
                            </>
                        ): (
                            <>
                                <ButtonMenu label="Profile" icon="fa-regular fa-id-badge"
                                            to='/profile' className="StartalkButton"
                                            title="Go to your Profile"
                                />
                            </>
                        )
                    }

                </p>
            </React.Fragment>
        );
    }

    const addQuote = (user) => {
        // Ajouter une citation à l'utilisateur
        if(user._id){
            setUserIdToEdit(user._id)
            setWriternameToAdd(user.pseudo);
            setVisible(true);
        }
    }

    const deleteQuote = (user) => {
        // Supprimer une citation de l'utilisateur
        if(user._id){
            setUserIdToEdit(user._id)
            setWriternameToAdd(user.pseudo);
            setVisibleDelModal(true);
        }
    }

    const showDisconnectPopUp = (user, e) => {
        setShowConfirm(!showConfirm);
        setDisconnectButtonRef(e.currentTarget);
        setSelectedUser(user)
    }

    // Créez une référence pour le toast
    const toast = useRef(null);

    const handleDisconnect = (user) => {
        axios.delete(`/startalk-api/admin/users/disconnect/${user._id}`, {
            withCredentials : true,
        })
            .then(response => {
                console.log('response')
                toast.current.show({severity:'success', summary: 'Success', detail: response.data.message, life: 3000});
            })
            .catch(error => {
                // Affichez l'erreur dans un toast
                toast.current.show({severity:'error', summary: 'Erreur', detail: error.response.data.message, life: 3000});
            });
    };


    return (
        <Base>
            <Toast position="top-center" ref={toast} />
            <div className="UserPanel">
                <Divider align="center" className="DeviderUserPanel">
                    <p>Users Panel Administration</p>
                </Divider>
                <DataTable value={users} className="UserDataTable" unstyled={true} >
                    <Column field="_id" header="User ID"></Column>
                    <Column field="discordId" header="Discord ID"></Column>
                    <Column field="pseudo" header="Pseudo"></Column>
                    <Column field="Role" header="Role"></Column>
                    <Column body={actionBodyTemplate} header="Actions"></Column>
                </DataTable>
                <Paginator first={currentPage * rows} rows={rows} totalRecords={totalRecords}
                           onPageChange={(e) => {
                               setCurrentPage(e.page);
                               setRows(e.rows);
                           }}
                           rowsPerPageOptions={[1, 2, 3, 4, 5]}
                />
                <AddCitationModal visible={visible} setVisible={setVisible}
                                  apiUrl={`/startalk-api/admin/users/addcitation/${userIdToEdit}`}
                                  writernameToAdd={writernameToAdd}
                />
                <DeleteCitationModal visibleDelModal={visibleDelModal} setVisibleDelModal={setVisibleDelModal}
                                     writerIdToDel={userIdToEdit}
                                     writernameToDel={writernameToAdd}
                />
                <ConfirmPopup target={disconnectButtonRef} visible={showConfirm} onHide={() => setShowConfirm(false)}
                              message={<p>Are you sure you want to disconnect <strong>{selectedUser?.pseudo}</strong> ?
                                  Remember, disconnecting other writers might just make your citations the talk of the
                                  town! 😎</p>}
                    accept={() => handleDisconnect(selectedUser)}
                />
            </div>
        </Base>
    );
}
