import { Dialog } from "@headlessui/react";
import React from "react";  
import { useForm } from "react-hook-form";
import Button from "./Button";

import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import Loading from "./Loader";

const ChangePassword = ({open, setOpen}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [changePassword, {isLoading}] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if(data.password !== data.cpass) {
            toast.warning('Passwords do not match');
            return;
        }

        try {
            const res = await changePassword(data).unwrap();
            toast.success(res?.message || 'New User changed successfully');

            setTimeout(() => {
                setOpen(false);
            }, 1500);   
            
        } catch (error) {
    
            console.log(error);
            toast.error('Error changing password');
        }
    }

    return (
        <>

            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title 
                    as = 'h2' 
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        Change Password
                    </Dialog.Title>  

                    <div className="mt-2 flex flex-col gap-6">
                        <Textbox
                        placeholder = 'New Password'
                        type = 'password'
                        name = 'password'
                        label = 'New Password'
                        className = 'w-full rounded'
                        register = {register("cpass", {
                            required: 'This field is required',

                        })}
                        error = {errors.cpass ? errors.cpass.message : ''}
                        />

                        <Textbox
                        placeholder = 'Confirm Password'
                        type = 'password'
                        name = 'password'
                        label = 'Confirm Password'
                        className = 'w-full rounded'
                        register = {register("cpass", {
                            required: 'This field is required',

                        })}
                        error = {errors.cpass ? errors.cpass.message : ''}
                        />
                    </div>

                    {isLoading ? (
                        <div className="py-5">
                            <Loading />

                        </div>
                        
                    ) : (
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>

                            <Button
                            type = 'submit'
                            className='bg-blue-600 px-8 text-sm font-semibold text-white sm:w-auto hover:bg-blue-700'
                            label='Save'
                            />

                            <button
                            type = 'button'
                            className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto '
                            onClick={() => setOpen(false)}
                            
                            >Cancel</button>

                           
                        </div>

                    )}


                </form>

            </ModalWrapper>
        </>
    );

    
};

export default ChangePassword;
