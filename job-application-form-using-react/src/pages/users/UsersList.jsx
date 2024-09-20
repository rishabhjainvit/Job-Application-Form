import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import Swal from "sweetalert2";
import { useAlert } from "../../context/AlertContext";

function UsersList() {
  const { storedData, removeDataById } = useLocalStorage("users");
  const Alert = useAlert();

  async function deleteHandler(id) {
    console.log(id);

    const result = await Alert({
      title: "Are You Sure?",
      message: `You are about to delete application ${id}.`,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result) {
      removeDataById(id);
      console.log('Application deleted');
      await Alert({
        title: "Deleted!",
        message: "Your applicaion has been deleted.",
        icon: "success",
        showConfirmButton: false,
        showCancelButton: false,
        timeout: 2000
      });
    } else {
      console.log('Delete cancelled');
    }
  }

  return (
    <div>
      <h1 className="text-center my-5">All Applications</h1>
      <div>
        <div className="max-w-[70%] mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="w-full text-right my-2">
            <Link className="text-blue-600" to="/add-application">
              Add new application
            </Link>
          </div>
          {storedData?.length ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DOB
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {storedData.map((user) => (
                  <tr
                    key={user.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.basicDetails.firstName}
                    </th>
                    <td className="px-6 py-4">{user.basicDetails.lastName}</td>
                    <td className="px-6 py-4">{user.basicDetails.dob}</td>
                    <td className="px-6 py-4">{user.basicDetails.email}</td>
                    <td className="px-6 py-4">{user.basicDetails.gender}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/update-application/${user.id}`}
                        className="mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          deleteHandler(user.id);
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-red-600 py-10">No data found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersList;
