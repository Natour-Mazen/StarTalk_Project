import React, {useRef} from 'react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";

export default function AddCitationModal({visible, setVisible}) {

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
        const titre = data.titre;
        const description = data.description;
        if (titre !== '' && description !== '') {
            try {
                const response = await axios.post('startalk-api/citations', {
                    title: titre,
                    description: description,
                });

                if (response.status === 201) {
                    showSuccessToast();
                }
            } catch (error) {
                // Handle error

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

    return (
        <>
            <Toast ref={toast}
                   position="top-center"
            />
            <Dialog header="Let your writer's soul express itself ✒️"
                    visible={visible} style={{ width: '30vw' }}
                    onHide={handleClose}
                    draggable={false}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">

                    <Controller
                        name="titre"
                        control={form.control}
                        rules={{ required: 'Title is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>Title</label>
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
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
                            label="Post"
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
