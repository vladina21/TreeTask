import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import Button from "../Button";
import Loading from "../Loader";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import NodeListSingle from "./NodeListSingle";
import { useInsertNodeMutation, useUpdateNodeMutation } from "../../redux/slices/api/nodeApiSlice";

const AddNode = ({ open, setOpen, nodeData }) => {
  let defaultValues = nodeData ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });


  const [addNode, { isLoading }] = useInsertNodeMutation();
  const [updateNode, { isLoading: isUpdating }] = useUpdateNodeMutation();
  const [nameParentNode, setNameParentNode] = useState(nodeData?.nameParentNode || []);

  useEffect(() => {
    if (nodeData?.nameParentNode) {
      setNameParentNode(nodeData.nameParentNode);
    }

  }, [nodeData]);

  const handleOnSubmit = async (data) => {
    try {

      data.nameParentNode = nameParentNode;

      if (nodeData) {
        const result = await updateNode(data).unwrap();
        toast.success("Node updated successfully");

      } else {
        await addNode({ ...data}).unwrap();
        toast.success("Node added successfully");
      }

      setTimeout(() => {
        setOpen(false);
        refetch();
      }, 1000);
    } catch (error) {
      toast.error("Error adding node");
      console.log(error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {nodeData ? "UPDATE NODE" : "ADD NEW NODE"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Node name"
              type="text"
              name="name"
              label="Node Name"
              className="w-full rounded"
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />

            <NodeListSingle setNode={setNameParentNode} node={nameParentNode} fieldLabel="Parent Node"/>

            <Textbox
              placeholder="Admin"
              type="text"
              name="admin"
              label="Admin"
              className="w-full rounded"
              register={register("admin", {
                required: "Admin is required!",
              })}
              error={errors.admin ? errors.admin.message : ""}
            />
          </div>

          {0 ? (
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

export default AddNode;
