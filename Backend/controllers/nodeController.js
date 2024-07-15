import { response } from "express";
import Node from "../models/node.js";

export const insertNode = async (req, res) => {
  try {
    const { name, nameParentNode, admin } = req.body;

    const nodeExist = await Node.findOne({ name });

    if (nodeExist) {
      return res.status(400).json({
        status: false,
        message: "Node already exists",
      });
    }

    const parentNode = await Node.findOne({ nameParentNode });
    const level = parentNode.level;

    const node = await Node.create({
      name,
      nameParentNode,
      level,
      admin
     //node
    });

    if (node) {

      res.status(201).json(node);
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid node data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getNodesList = async (req, res) => {
  try {
    const nodes = await Node.find().select("name nameParentNode level admin createdAt");

    res.status(200).json(nodes);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteNode = async (req, res) => {
  try {
    const { id } = req.params;

    await Node.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: true, message: "Node deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateNode = async (req, res) => {
  // try {
  //   const { userId, isAdmin } = req.user;
  //   const { _id } = req.body;

  //   const id =
  //     isAdmin && userId === _id
  //       ? userId
  //       : isAdmin && userId !== _id
  //       ? _id
  //       : userId;

  //   const user = await User.findById(id);

  //   if (user) {
  //     user.name = req.body.name || user.name;
  //     user.node = req.body.node || user.node;
  //     user.role = req.body.role || user.role;

  //     const updatedUser = await user.save();

  //     user.password = undefined;

  //     res.status(201).json({
  //       status: true,
  //       message: "Profile Updated Successfully.",
  //       user: updatedUser,
  //     });
  //   } else {
  //     res.status(404).json({ status: false, message: "User not found" });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return res.status(400).json({ status: false, message: error.message });
  // }
};