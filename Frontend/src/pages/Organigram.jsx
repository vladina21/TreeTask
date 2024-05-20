import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdOutlineAccountTree } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import NodeTable from "../components/Nodes/NodeTable";
import AddNode from "../components/Nodes/AddNode";

const TABS = [
  { title: "List View", icon: <FaList /> },
  { title: "Tree View", icon: <MdOutlineAccountTree /> },
 
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Organigram = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Noduri` : "Noduri"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Crează Nod'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
      

        {selected == 1 ? (
          <BoardView tasks={tasks} />
        ) : (
          <div className='w-full'>
            <NodeTable tasks={tasks} />
          </div>
        )}
      </Tabs>

      <AddNode open={open} setOpen={setOpen} />
    </div>
  );
};

export default Organigram;
