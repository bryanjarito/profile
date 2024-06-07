import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

interface TableBasicProps {
  data: Array<Object>
}

const TableBasic = (props:TableBasicProps) => {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(false)

  useEffect(()=>{
    setData(props.data);
  })

  async function deleteUser (id: string) {
    await axios.delete(`http://localhost:3000/api/users/${id}`)
      .then(function(response) {
        props.data = data.filter(item => item._id !== id)
        setData(props.data)
        setAlert(true)
      })
      .catch(function (error) {
        console.log(error)
      })
    }

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => setAlert(false), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alert])

  const Alert = () => (
    <div className="flex border-l-6 border-[#34D399] bg-[#FDFDFD] px-7 py-8 shadow-md dark:bg-[#1B1B24] md:p-9 fixed w-[calc(100%-21.2rem)] bg-opacity-90">
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
          Successfully deleted.
        </h5>
      </div>
    </div>
  )

  return (
    <>
    { alert ? <Alert/> : <></>} 
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Profile List
        </h4>
        <div className="">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none"
            onChange={(e)=> setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th>Lastname</th>
              <th>Firstname</th>
              <th>Birthdate</th>
              <th>Brgy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
            .filter(item => item.firstName.toLowerCase().includes(search))
            .map((item:any) =>
              <tr key={item._id} className="border-t-2 border-slate-100">
                <td className="py-3">{item.lastName}</td>
                <td className="py-3">{item.firstName}</td>
                <td className="py-3">{item.birthDate}</td>
                <td className="py-3">{item.brgy}</td>
                <td className="py-3 w-[10rem]">
                  <div className='flex'>
                    <Link
                      to={`/profile/edit/${item._id}/`}
                      className="group border-2 rounded-md w-21 h-9 bg-blue-500 hover:bg-white hover:border-blue-500 hover:text-blue-500 text-white flex justify-center items-center"
                    >
                      <svg className="stroke-white group-hover:stroke-blue-500 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                      Edit
                    </Link>

                    <button
                      className="group border-2 rounded-md w-21 h-9 bg-red-500 hover:bg-white hover:border-red-500 hover:text-red-500 text-white flex justify-center items-center"
                      onClick={()=>deleteUser(item._id)}
                    >
                      <svg className="stroke-white group-hover:stroke-red-500 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                      Edit
                      </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default TableBasic;
