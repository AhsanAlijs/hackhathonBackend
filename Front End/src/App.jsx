import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { RiDeleteBin5Line, RiEdit2Line } from '@remixicon/react';
import LoadingOverlay from './components/LoadingOverlay';
import Modal from './components/Modal';

const App = () => {

  const [allUsers, setAllUsers] = useState([])


  useEffect(() => {

    getUsers()

  }, [])

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      const allUsers = response.data;
      setAllUsers(allUsers)
      console.log(allUsers);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  }


  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    contact: ''
  })





  const addUser = async (e) => {
    e.preventDefault();

    const userName = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const contact = e.target.contact.value.trim();

    if (userName === '' || email === '' || password === '' || contact === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields',
      });
      return;
    }

    try {
      await axios.post('http://localhost:3000/register', {
        userName,
        email,
        password,
        contact
      });

      Swal.fire({
        icon: 'success',
        title: 'User added successfully',
        showConfirmButton: false,
        timer: 1500
      });

      e.target.reset();

      getUsers();
    } catch (error) {
      if ('Request failed with status code 400' == error.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.',
        });
        return
      }

      if ('Request failed with status code 409' == error.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email Already in use!',
        });
        return
      }
      if ('Request failed with status code 500' == error.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Phone Number!',
        });
        return
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };



  // Delete Todo Start
  const deleted = (id) => {
    axios.delete(`http://localhost:3000/deleteUser/${id}`)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Item Deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
        getUsers()
      }).catch((error) => {
        // console.log(error);
      })
  }
  // Delete Todo Delete







  const [userId, setUserId] = useState()

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (item) => {
    setIsOpen(true);
    setUserId(item)
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === 'modal') {
      setIsOpen(false);
    }
  };

  const userModalClose = () => {
    setIsOpen(false);
  }


















  return (
    <main className='bg-[#0f172a] min-h-screen lg:p-10 p-2'>
      <div className=' text-center h-[10vh] text-2xl font-bold text-[#38bdf8]  '>
        <h3>User Add Form</h3>
      </div>

      <div className='flex items-center justify-center w-full  lg:p-0 p-4 '>
        <form className="max-w-md mx-auto w-full" onSubmit={(e) => addUser(e)}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="username"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#38bdf8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
            // required
            />
            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#38bdf8] peer-focus:dark:text-[#38bdf8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#38bdf8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}

            // required
            />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#38bdf8] peer-focus:dark:text-[#38bdf8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#38bdf8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}

            // required
            />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#38bdf8] peer-focus:dark:text-[#38bdf8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Password</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="contact"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#38bdf8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setUserData({ ...userData, contact: e.target.value })}

            // required
            />
            <label htmlFor="contact" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#38bdf8] peer-focus:dark:text-[#38bdf8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Contact Number</label>
          </div>

          <button
            type="submit"
            className="text-[#0f172a] bg-[#38bdf8] hover:bg-[#38bdf8] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Submit
          </button>
        </form>
      </div>

      <div className='text-[#38bdf8] text-center p-4 text-2xl font-bold ' >
        All Users Data
      </div>
      <hr />

      {isOpen && <Modal toggleModal={toggleModal} handleOutsideClick={handleOutsideClick} userId={userId} userModalClose={userModalClose} getUsers={getUsers} />}

      <div className='flex items-center justify-evenly lg:flex-row  flex-wrap  max-sm:flex-col p-2  ' >
        {allUsers.length > 0 ? allUsers.map((item, index) => {
          return (
            <div key={item._id} className='border lg:w-[30%] w-full  p-4 rounded-xl lg:mt-10 mt-4 text-[#38bdf8]' >

              <div>
                <div className='p-4 flex items-center justify-between' >
                  <p className='px-2 border w-fit rounded-full' >{index + 1}</p>
                  <div className='flex items-center gap-4' >
                    <span className='w-fit cursor-pointer' onClick={(e) => toggleModal(item._id)} >
                      <RiEdit2Line size={24} />
                    </span>
                    <span className='w-fit cursor-pointer' onClick={() => deleted(item._id)} >
                      <RiDeleteBin5Line size={24} />
                    </span>
                  </div>
                </div>

                <div className='border p-2 rounded' >
                  <p>UserName</p>
                  <p>{item.userName}</p>
                </div>
                <div className='border p-2 rounded mt-2' >
                  <p>Email</p>
                  <p>{item.email}</p>
                </div>
                <div className='border p-2 rounded mt-2 ' >
                  <p>Contact</p>
                  <p>{item.contact}</p>
                </div>
              </div>



            </div>
          )
        })
          : <LoadingOverlay />
        }
      </div>
    </main>
  )
}

export default App