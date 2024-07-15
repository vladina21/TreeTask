import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
//import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import AddNode from "../components/Nodes/AddNode";
import { useGetUsersListQuery , useDeleteUserMutation, useUserActionMutation} from "../redux/slices/api/userApiSlice";
import {toast } from 'sonner';
import { formatDate } from "../utils";
import Loading from "../components/Loader";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useDeleteNodeMutation } from "../redux/slices/api/nodeApiSlice";
import Tabs from "../components/Tabs";
import { OrganizationChart } from 'primereact/organizationchart';
import { useGetNodesListQuery } from "../redux/slices/api/nodeApiSlice";

const NEW_USER_THRESHOLD_HOURS = 1;

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const Organigram = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedView, setSelectedView] = useState(0);
  const [orgData, setOrgData] = useState(null);

  const {data, isLoading, refetch} = useGetNodesListQuery();
  const [deleteNode] = useDeleteNodeMutation();

  console.log(data);

  const transformData = (nodes) => {
    const nodeMap = new Map();
    
    // Create a map of nodes
    nodes.forEach(node => {
      nodeMap.set(node._id, { label: node.name, expanded: true, children: [] });
    });

    // Build the hierarchy
    const rootNodes = [];
    nodes.forEach(node => {
      if (node.nameParentNode && node.nameParentNode !== node.name) {
        const nameParentNode = nodes.find(n => n.name === node.nameParentNode);
        if (nameParentNode) {
          nodeMap.get(nameParentNode._id).children.push(nodeMap.get(node._id));
        }
      } else {
        rootNodes.push(nodeMap.get(node._id));
      }
    });

    return rootNodes.sort((a, b) => a.level - b.level);
  };

  useEffect(() => {
    console.log("-----in use effect");
    if (!isLoading && data) {
      const transformedData = transformData(data);
      setOrgData(transformedData);
    }
  }, [data, isLoading]);

  const deleteHandler = async () => {
    try {
      const result = await deleteNode(selectedNode);  
      refetch();

      toast.success("Node deleted successfully");
      setSelectedNode(null);

      setTimeout(() => {
        setOpenDialog(false);
      }, 500);


      
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
      
    }
  };


  const deleteClick = (id) => {
    setSelectedNode(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelectedNode(el);
    setOpen(true);
  };

  const now = new Date();

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-3 pl-4'>Node</th>
        <th className='py-3 pl-4'>Parent Node</th>
        <th className='py-3 pl-4'>Level</th>
       
        <th className='py-3'>Created At</th>
        <th className='py-3 pl-4'>Admin</th>
        
       
      </tr>
    </thead>
  );

  const TableRow = ({ node }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-4'>
        <div className='flex items-center gap-3'>
          {node.name}
        </div>
      </td>
  
      <td className='p-4'>{node.nameParentNode}</td>
      <td className='p-4'>{node.level}</td>
  
      <td>
        <p className='text-sm text-gray-600'>{formatDate(new Date(node?.createdAt))}</p>
      </td>

      <td className='p-4'>{node.admin}</td>
  
      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(node)}
        />
  
        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(node?._id)}
        />
      </td>
    </tr>
  );

  const nodeTemplate = (orgData) => {
    return (
    <div className="flex flex-column items-center">
      <div className="mt-3 font-medium text-lg bg-gray-500 text-white border-2 border-gray-700 p-4 rounded-md">
        {orgData.label}
      </div>
    </div>
    );
  };

  return isLoading || !orgData ? (
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
          <Title title='Organigram' />
          <Button
            onClick={() => setOpen(true)}
            label='Add Node'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            
          />
        </div>

        <Tabs tabs={TABS} setSelected={setSelectedView}>

        {selectedView !== 1 ? (
        <div className="card overflow-x-auto">
          <div className="chart-container">
            <OrganizationChart value={orgData} nodeTemplate={nodeTemplate} />
          </div>
        </div>
        ) : (
          <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {data?.map((node, index) => (
                  <TableRow key={index} node={node} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
        </Tabs>
      
      </div>

      <AddNode
        open={open}
        setOpen={(value) => {
          setOpen(value);
          if (!value) {
            refetch(); // Call refetch when setOpen is set to false
          }
        }}
        nodeData={selectedNode}
        key={new Date().getTime().toString()}
      />


    </>
  );
};

export default Organigram;
