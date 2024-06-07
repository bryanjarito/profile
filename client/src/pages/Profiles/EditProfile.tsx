import {useState, useEffect} from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import parse from 'html-react-parser'
import { Link, useParams } from "react-router-dom";

  interface User {
    firstName: string,
    lastName: string,
    middleName: string,
    birthDate: string,
    province: string,
    city: string,
    brgy: string,
    street: string
  }

const Profiles = () => {
  const [data, setData] = useState<User>(Object)
  const [alert, setAlert] = useState<Boolean>(false)
  const { id } = useParams()

  useEffect(() => {
    if (id === undefined) {
      const empty = {
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        province: '',
        city: '',
        brgy: '',
        street: ''
      }
      setData(empty)
    } else {
      async function fetchUsers() {
        await axios.get(`http://localhost:3000/api/users/${id}`)
          .then(function(response) {
            setData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })
      }
  
      fetchUsers();
    }
  }, [id])

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => setAlert(false), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alert])

  async function updateUser (e: any) {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/users/${id}`, data)
      .then(function(response) {
        setAlert(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  async function createUser (e: any) {
    e.preventDefault();
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      birthDate: data.birthDate,
      province: data.province,
      city: data.city,
      brgy: data.brgy,
      street: data.street
    }
    await axios.post(`http://localhost:3000/api/users`, body)
      .then(function(response) {
        setAlert(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  const Alert = () => (
    <div className="flex border-l-6 border-[#34D399] bg-[#FDFDFD] px-7 py-8 shadow-md dark:bg-[#1B1B24] md:p-9 fixed w-[70%] bg-opacity-90">
      <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
            fill="white"
            stroke="white"
          ></path>
        </svg>
      </div>
      <div className="w-full">
        <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
          { id == null ? 'User successfully created' : 'User successfully updated' }
        </h5>
      </div>
    </div>
  )

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          { alert ? <Alert/> : <></>} 
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              { id == null ? 'Create Profile' : 'Edit Profile' }
              </h3>
            </div>
            <form action="#" onSubmit={id == null ? createUser : updateUser}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={data.firstName ?? ''}
                      onChange={e=>setData({...data, firstName:e.target.value})}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={data.lastName ?? ''}
                      onChange={e=>setData({...data, lastName:e.target.value})}
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Middle name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your middle name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={data.middleName ?? ''}
                      onChange={e=>setData({...data, middleName:e.target.value})}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Birth date
                    </label>
                    <input
                      type="text"
                      placeholder="Birth date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={data.birthDate ?? ''}
                      onChange={e=>setData({...data, birthDate:e.target.value})}
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Province
                  </label>
                  <input
                    type="text"
                    placeholder="Province"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={data.province ?? ''}
                    onChange={e=>setData({...data, province:e.target.value})}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={data.city ?? ''}
                    onChange={e=>setData({...data, city:e.target.value})}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Barangay
                  </label>
                  <input
                    type="text"
                    placeholder="Barangay"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={data.brgy ?? ''}
                    onChange={e=>setData({...data, brgy:e.target.value})}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Street
                  </label>
                  <input
                    type="text"
                    placeholder="Street"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={data.street ?? ''}
                    onChange={e=>setData({...data, street:e.target.value})}
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit">
                { id == null ? 'Create user' : 'Update user' }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profiles;
