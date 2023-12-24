import {Button} from "primereact/button";
import {Toast} from 'primereact/toast';
import {ConfirmPopup} from 'primereact/confirmpopup';
import axios from 'axios';
import React, {useContext, useState, useRef} from "react";
import {UserContext} from "../../utils/UserAuthContext";

export default function DeleteButton({citation}) {
    const { id } = useContext(UserContext);
    const [showButton, setShowButton] = useState(citation.writerId === id);
    const toast = useRef(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteButtonRef, setDeleteButtonRef] = useState(null);

    const handleDelete = async () => {
        try {
            const url = `/startalk-api/citations/${citation._id}`;
            const response = await axios.delete(url);
            if(response.status === 200)
                toast.current.show({severity: 'success', summary: 'Success', detail:  ' Abracadabra the citation has disappeared! 🎩🐇', life: 3000});
        } catch (error) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Oops! The citation pulled a magic trick and stayed put. 😶‍🌫️', life: 3000});
        }
    };

    const showDisconnectPopUp = (e) => {
        setShowConfirm(!showConfirm);
        setDeleteButtonRef(e.currentTarget);
    }


    return (
        <>
            <Toast position="center" ref={toast} />
            {showButton && (
                <Button
                    icon="fa-regular fa-trash-can"
                    rounded
                    text
                    className="StartalkButtonSpec"
                    title="delete"
                    onClick={(e) => showDisconnectPopUp(e)}
                    ref={deleteButtonRef}
                />
            )}
            <ConfirmPopup target={deleteButtonRef} visible={showConfirm} onHide={() => setShowConfirm(false)}
                          message={<p>Are you sure you want to make this disappear ? 🎩🐇</p>}
                          accept={() => handleDelete()}
            />
        </>
    );
}
