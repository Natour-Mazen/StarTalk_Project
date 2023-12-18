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
import {UserContext} from "../../../utils/UserAuthContext";

export default function AddCitationModal({visible, setVisible, apiUrl = '/startalk-api/citations', writernameToAdd}) {

    const { handleDisconnectErrResponse } = useContext(UserContext);

    const [humors, setHumors] = useState([]);
    const [selectedHumor, setSelectedHumor] = useState(null);

    const toast = useRef(null);

    const showSuccessToast = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'A masterpiece has just been created 🤌', life: 2700});
    }

    const showErrorToast = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Somthing went wrong 😕', life: 2700});
    }

    const defaultValues = { description: '' , titre :''};
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    const onSubmit = async (data) => {
        setVisible(false);
        const { titre, description } = data;
        let humor = null;

        if (selectedHumor !== null) {
            humor = selectedHumor._id;
        }

        if (titre !== '' && description !== '') {
            try {
                const payload = {
                    title: titre,
                    description: description,
                };

                if (humor) {
                    payload.humor = humor;
                }

                const response = await axios.post(apiUrl, payload, {
                    withCredentials: true,
                });

                if (response.status === 201) {
                    showSuccessToast();
                }
            } catch (error) {
                handleDisconnectErrResponse(error);
                showErrorToast();
            }
        }

        form.reset();
    };


    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    const handleClose = () => {
        setVisible(false);
        form.reset();
    };



    useEffect(() => {
        const fetchHumors = async () => {
            try {
                const response = await axios.get('/startalk-api/citations/possiblehumors');
                setHumors(response.data);
            } catch (error) {
            }
        };

        fetchHumors();
    }, []);

    return (
        <>
            <Toast ref={toast}
                   position="top-center"
            />
            <Dialog header={writernameToAdd ? `Let ${writernameToAdd} writer's soul express itself ✒️`  : 'Let your writer\'s soul express itself ✒️'}
                    visible={visible}
                    onHide={handleClose}
                    draggable={false}
                    className='dialog'
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                    <Controller
                        name="titre"
                        control={form.control}
                        rules={{
                            required: 'Title is required.',
                            maxLength: {
                                value: 25,
                                message: 'Title cannot exceed 25 characters.'
                            }
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>Title</label>
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="humor"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <label htmlFor={field.name}>Humor
                                    <small className="p-d-block"
                                           style={{color: 'gray', marginLeft: '5px', fontSize: '10px'}}> <i>(This field
                                        is optional)</i>
                                    </small>
                                </label>
                                <Dropdown
                                    id={field.name}
                                    {...field}
                                    value={selectedHumor}
                                    options={humors}
                                    onChange={(e) => setSelectedHumor(e.value)}
                                    optionLabel="name"
                                    placeholder="Select a Humor"
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="description"
                        control={form.control}
                        rules={{ required: 'Description is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>Description</label>
                                <InputTextarea id={field.name} {...field} rows={4} cols={30} className={classNames({ 'p-invalid': fieldState.error })} style={{ resize: 'none' }} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Button icon="fa-brands fa-usps"
                            label={writernameToAdd ? `Post For ${writernameToAdd}`  : 'Post'}
                            rounded
                            style={{
                                width:'150px',
                                margin: 'auto'
                            }}
                            className="StartalkButton"
                    />
                </form>
            </Dialog>
        </>
    );
}
