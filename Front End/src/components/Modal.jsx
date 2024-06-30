import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const Modal = ({ handleOutsideClick, userId, getUsers, userModalClose }) => {




    const editUser = (e) => {
        e.preventDefault();

        const userName = e.target.elements.name.value.trim();
        const email = e.target.elements.email.value.trim();
        const contact = e.target.elements.contact.value.trim();
        if (userName === '' || email === '' || contact === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all fields',
            });
            return;
        }

        axios.put(`http://localhost:3000/updateUser/${userId}`, {
            userName,
            email,
            contact
        })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Edit successfully',
                    showConfirmButton: false,
                    timer: 1500
                });

                userModalClose()

                e.target.reset();

                getUsers();
            }).catch((error) => {
                console.log(error);
            })
    }


















    return (
        <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-50 w-screen overflow-y-hidden" >
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50"></div>

            {/* Modal Content */}
            <div id="modal" onClick={handleOutsideClick} className="relative flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-sm overflow-y-auto shadow-2xl bg-white ring-1 ring-gray-200 rounded-3xl p-10">
                    <div className="relative">
                        {/* Modal Header */}
                        <div className="flex flex-col text-center">
                            <p className="text-lg font-medium text-gray-500 lg:text-xl">
                                User Edit Form
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={(e) => editUser(e)} className="mt-12">
                            {/* Hidden Inputs */}
                            <input name="hidden" autoComplete="false" style={{ display: "none" }} />
                            <input name="_redirect" type="hidden" value="#" />

                            {/* Form Fields */}
                            <div className="space-y-3">
                                <div className="">
                                    <label htmlFor="UserName" className="block mb-3 text-sm font-medium text-black sr-only">
                                        Change User Name
                                    </label>
                                    <input id="name" name="text" type="text" placeholder="Change Your User Name" aria-placeholder="Your name" className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-[#38bdf8] focus:border-[#38bdf8] focus:bg-white focus:outline-none focus:ring-[#38bdf8] focus:ring-inset text-xs" />
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="email" className="block mb-3 text-sm font-medium text-black sr-only">email</label>
                                    <input id="email" name="email" type="email" placeholder="Change Your email" aria-placeholder="Type email here..." className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-[#38bdf8] focus:border-[#38bdf8] focus:bg-white focus:outline-none focus:ring-[#38bdf8] focus:ring-inset text-xs" />
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="contact" className="block mb-3 text-sm font-medium text-black sr-only">Contact</label>
                                    <input id="contact" name="contact" type="number" placeholder="Change Your Contact" aria-placeholder="Type Contact here..." className=" [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-[#38bdf8] focus:border-[#38bdf8] focus:bg-white focus:outline-none focus:ring-[#38bdf8] focus:ring-inset text-xs  " />
                                </div>

                                <div className="col-span-full">
                                    <button type='submit' className="flex w-full items-center justify-center h-10 px-4 py-2 text-base font-semibold text-white transition-all duration-200 rounded-full bg-gradient-to-b from-[#38bdf8] to-indigo-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 ring-offset-gray-200 hover:shadow-none">Log in</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
