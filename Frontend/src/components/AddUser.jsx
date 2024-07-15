import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import NodeList from "./Nodes/NodeList";
import RoleList from "./Nodes/RoleList";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Function from react-hook-form to set field values
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [node, setNode] = useState(userData?.node || []);
  const [role, setRole] = useState(userData?.role || []);
  const [generatedPassword, setGeneratedPassword] = useState("");

  useEffect(() => {
    if (userData?.node) {
      setNode(userData.node);
    }

    if (userData?.role) {
      setRole(userData.role);
    }

  }, [userData]);

  const handleOnSubmit = async (data) => {
    try {
      data.node = node;
      data.role = role;

      console.log('Submitting data:', data); // Debugging: Log the data being submitted

      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success("Profile updated successfully");

        if (userData?._id === user?._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        const passwordToUse = generatedPassword || data.email;
        await addNewUser({ ...data, password: passwordToUse }).unwrap();
        toast.success("User added successfully");
      }

      setTimeout(() => {
        setOpen(false);
        refetch();
      }, 1000);
    } catch (error) {
      toast.error("Error adding user");
      console.log(error);
    }
  };

  const generateRandomPassword = () => {
    const length = 10; // Length of the generated password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(newPassword);
    
    // Set the password field in the form using setValue from react-hook-form
    setValue("password", newPassword);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Full name"
              type="text"
              name="name"
              label="Full Name"
              className="w-full rounded"
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <NodeList setNode={setNode} node={node} fieldLabel="Assign Node"/>
            <Textbox
              placeholder="Email Address"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded"
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <RoleList setRole={setRole} role={role} fieldLabel="Assign Role"/>

            <Textbox
              placeholder="Generated Password"
              type="text"
              name="password"
              label="Password"
              className="w-full rounded"
              register={register("password", {
                required: "Password is required!",
                validate: value => !!value || "Password is required!", // Custom validation rule
              })}
              error={errors.password ? errors.password.message : ""}
              value={generatedPassword}
              readOnly
            />
            <div className="flex justify-center items-center gap-4">
              <Button
                type="button"
                className="bg-red-600 px-8 text-sm font-semibold text-white hover:bg-red-700 sm:w-50"
                label="Generate Password"
                onClick={generateRandomPassword}
              />
            </div>
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                label="Submit"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
