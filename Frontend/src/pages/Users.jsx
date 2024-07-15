import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
//import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import { useGetUsersListQuery , useDeleteUserMutation, useUserActionMutation} from "../redux/slices/api/userApiSlice";
import {toast } from 'sonner';
import { formatDate } from "../utils";
import Loading from "../components/Loader";

const NEW_USER_THRESHOLD_HOURS = 1;

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const {data, isLoading, refetch} = useGetUsersListQuery();
  const [deleteUser]= useDeleteUserMutation();
  const [userAction] = useUserActionMutation();

  console.log(data);

  const userActionHandler =  async () => {
    try {
      const result = await userAction({
        isActive: !selected?.isActive ,
        id: selected?._id,
      });

      refetch();

      toast.success(result.data.message);
      setSelected(null);

      setTimeout(() => {
        setOpenAction(false);
      }, 500);
      
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
      
    }
  };
  const deleteHandler = async () => {
    try {
      const result = await deleteUser(selected);  
      refetch();

      toast.success("User deleted successfully");
      setSelected(null);

      setTimeout(() => {
        setOpenDialog(false);
      }, 500);


      
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
      
    }
  };


  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusClick = (el) => { 
    setSelected(el);
    setOpenAction(true);
  };

  const now = new Date();

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-3 pl-4'>Full Name</th>
        <th className='py-3 pl-4'>Node</th>
        <th className='py-3 pl-4'>Email</th>
        <th className='py-3 pl-4'>Role</th>
       
        <th className='py-3'>Created At</th>
        <th className='py-3 pl-4'>State</th>
        
       
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => {
    const createdAtDate = new Date(user.createdAt);
    const differenceInMillis = now - createdAtDate;
    const differenceInHours = differenceInMillis / (1000 * 60 * 60);
    const isNewUser = differenceInHours < NEW_USER_THRESHOLD_HOURS;

    return (
      <tr
        className={`border-b border-gray-200 text-gray-600 ${
          isNewUser ? "bg-green-200 hover:bg-green-300" : "hover:bg-gray-400/10"
        }`}
      >
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
              <span className="text-xs md:text-sm text-center">
                {getInitials(user.name)}
              </span>
            </div>
            {user.name}
          </div>
        </td>

        <td className="p-4">
          {user.node.map((nodeName, index) => (
            <div key={index}>
              {nodeName}
            </div>
          ))}
        </td>
        <td className="p-4">{user.email || "user.email.com"}</td>
        <td className="p-4">{user.role}</td>

        <td>
          <p className="text-sm text-gray-600">{formatDate(createdAtDate)}</p>
        </td>

        <td>
          <button
            onClick={() => userStatusClick(user)}
            className={clsx(
              "w-fit px-4 py-1 rounded-full flex justify-center items-center text-s font-semibold",
              user?.isActive ? "bg-blue-200" : "bg-yellow-100"
            )}
          >
            {user?.isActive ? "Active" : "Disabled"}
          </button>
        </td>

        <td className="p-2 flex gap-4 justify-end">
          <Button
            className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
            label="Edit"
            type="button"
            onClick={() => editClick(user)}
          />

          <Button
            className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
            label="Delete"
            type="button"
            onClick={() => deleteClick(user?._id)}
          />
        </td>
      </tr>
    );
  };

  const sortedData = [...(data || [])].sort((a, b) => {
    const aCreatedAt = new Date(a.createdAt);
    const bCreatedAt = new Date(b.createdAt);
    const aIsNew = (now - aCreatedAt) / (1000 * 60 * 60) < NEW_USER_THRESHOLD_HOURS;
    const bIsNew = (now - bCreatedAt) / (1000 * 60 * 60) < NEW_USER_THRESHOLD_HOURS;

    if (aIsNew && !bIsNew) return -1;
    if (!aIsNew && bIsNew) return 1;
    return 0;
  });

  return isLoading ? (
    <>
      {console.log("node is loading")}
      <div className="py-10">
        <Loading />
      </div>
    </>
  ) : (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Users' />
          <Button
            onClick={() => setOpen(true)}
            label='Add New User'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {sortedData.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={(value) => {
          setOpen(value);
          if (!value) {
            refetch(); // Call refetch when setOpen is set to false
          }
        }}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
