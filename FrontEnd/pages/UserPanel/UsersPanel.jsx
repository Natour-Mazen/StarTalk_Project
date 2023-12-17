import React, { useEffect, useState } from 'react';
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

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rows, setRows] = useState(3);
    const [visible, setVisible] = useState(false);
    const [writernameToAdd, setWriternameToAdd] = useState('');

    const fetchUsers = (page, rows) => {
        axios.get(`/startalk-api/admin/users?page=${page + 1}&limit=${rows}`)
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
                    <Button icon={<FontAwesomeIcon icon={faPlus}/>} className="StartalkButton"
                            onClick={() => addQuote(rowData)}/>
                    <span className="m-1"/>
                    <Button icon={<FontAwesomeIcon icon={faTrash}/>} className="StartalkButton"
                            onClick={() => deleteQuote(rowData)}/>
                    <span className="m-1"/>
                    <Button icon={<FontAwesomeIcon icon={faSignOutAlt}/>} className="StartalkButton"
                            onClick={() => disconnect(rowData)}/>
                </p>
            </React.Fragment>
        );
    }

    const addQuote = (user) => {
        // Ajouter une citation à l'utilisateur
        setWriternameToAdd(user.pseudo);
        setVisible(true);
    }

    const deleteQuote = (user) => {
        // Supprimer une citation de l'utilisateur
        console.log(user)
    }

    const disconnect = (user) => {
        // Déconnecter l'utilisateur
        console.log(user)
    }

    return (
        <Base>
            <div className="UserPanel">
                <Divider align="center" className="DeviderUserPanel">
                    <p>Users Panel Administration</p>
                </Divider>
                <DataTable value={users} className="UserDataTable">
                    <Column field="discordId" header="Discord ID"></Column>
                    <Column field="pseudo" header="Pseudo"></Column>
                    <Column field="Role" header="Role"></Column>
                    <Column body={actionBodyTemplate} header="Action"></Column>
                </DataTable>
                <Paginator first={currentPage * rows} rows={rows} totalRecords={totalRecords}
                           onPageChange={(e) => {
                               setCurrentPage(e.page);
                               setRows(e.rows);
                           }} rowsPerPageOptions={[1, 2, 3, 4, 5, 6]}
                />
                <AddCitationModal visible={visible} setVisible={setVisible} apiUrl={`/startalk-api/citations/${writernameToAdd}`} writernameToAdd={writernameToAdd} />
            </div>
        </Base>
    );
}
