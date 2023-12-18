import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";

import '../../../assets/css/components/ForPages/AddCitations/AddCitationModal.css'
import MiniCitationCard from "../Citations/MiniCitationCard";
import {UserContext} from "../../../utils/UserAuthContext";

export default function DeleteCitationModal({visibleDelModal, setVisibleDelModal, writerIdToDel, writernameToDel}) {

    const { handleDisconnectErrResponse } = useContext(UserContext);
    const [citaions, setCitaions] = useState([]);
    const [selectedCitaion, setSelectedCitaion] = useState(null);

    const toast = useRef(null);

    const showSuccessToast = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'A masterpiece has just been gracefully removed 🍃', life: 2700});
    }

    const showErrorToast = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Somthing went wrong 😕', life: 2700});
    }

    const form = useForm({  });
    const errors = form.formState.errors;

    const onSubmit = async (data) => {

        if (selectedCitaion !== null) {
            try {
                const response = await axios.delete(`/startalk-api/admin/users/removecitation/${writerIdToDel}/${selectedCitaion._id}`,
                    {
                        withCredentials:true,
                    });
                if (response.status === 201) {
                    showSuccessToast();
                }
            } catch (error) {
                showErrorToast();
            }
        }
        setVisibleDelModal(false);
        setSelectedCitaion(null);
        form.reset();
    };


    useEffect(() => {
        if (visibleDelModal) {
            const fetchCitations = async () => {
                try {
                    const response = await axios.get(`/startalk-api/admin/users/allcitation/${writerIdToDel}`,
                        {
                            withCredentials:true,
                        });
                    setCitaions(response.data);
                } catch (error) {
                    handleDisconnectErrResponse(error);
                }
            };

            fetchCitations();
        }
    }, [visibleDelModal]);

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    const handleClose = () => {
        setVisibleDelModal(false);
        setSelectedCitaion(null);
        form.reset();
    };

    return (
        <>
            <Toast ref={toast}
                   position="top-center"
            />
            <Dialog header={`Delete a masterpiece written by ${writernameToDel} 🪶`}
                    visible={visibleDelModal}
                    onHide={handleClose}
                    draggable={false}
                    className='dialog'
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                    <Controller
                        name="CitationToRemove"
                        control={form.control}
                        rules={{
                            required: 'A Citation is required.',
                        }}
                        render={({ field }) => (
                            <>
                                <label htmlFor={field.name}>Citation To Remove</label>
                                <Dropdown
                                    id={field.name}
                                    {...field}
                                    value={selectedCitaion}
                                    options={citaions}
                                    onChange={(e) => {
                                        setSelectedCitaion(e.value);
                                        field.onChange(e.value); // Update the form field value
                                    }}
                                    optionLabel="title"
                                    placeholder="Select a citation"
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    {
                        selectedCitaion ? (
                            <MiniCitationCard citation={selectedCitaion}/>
                        ) : (
                            <></>
                        )
                    }
                    <Button icon="fa-brands fa-usps"
                            label={`Delete this citation written by ${writernameToDel}` }
                            rounded
                            style={{
                                width:'250px',
                                margin: 'auto'
                            }}
                            className="StartalkButton"
                    />
                </form>
            </Dialog>
        </>
    );
}
