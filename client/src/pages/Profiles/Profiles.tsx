import React, {useState, useEffect} from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TableBasic from '../../components/Tables/TableBasic';
import axios from 'axios';

const Profiles = () => {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    async function fetchUsers() {
      await axios.get('http://localhost:3000/api/users')
        .then(response => {
          setData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }

    fetchUsers();
  }, [])

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
       <TableBasic data={data}/>
      </div>
    </DefaultLayout>
  );
};

export default Profiles;
