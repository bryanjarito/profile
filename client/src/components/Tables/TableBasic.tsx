import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

const TableBasic = (props:any) => {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(()=>{
    setData(props.data);
  })

  return (
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
            .map((item:any, i:any) =>
              <tr key={i} className="border-t-2 border-slate-100">
                <td className="py-3">{item.lastName}</td>
                <td className="py-3">{item.firstName}</td>
                <td className="py-3">{item.birthDate}</td>
                <td className="py-3">{item.brgy}</td>
                <td className="py-3">
                  <Link
                    to="edit/"
                    className="group border-2 rounded-md w-21 h-9 bg-blue-500 hover:bg-white hover:border-blue-500 hover:text-blue-500 text-white flex justify-center items-center"
                  >
                    <svg className="stroke-white group-hover:stroke-blue-500 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    Edit
                  </Link>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBasic;
