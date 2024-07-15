import { response } from "express";
import Role from "../models/role.js";

export const insertRole = async (req, res) => {
  try {
    const { name } = req.body;

    const roleExist = await Role.findOne({ name });

    if (roleExist) {
      return res.status(400).json({
        status: false,
        message: "Role already exists",
      });
    }

    const role = await Role.create({
      name
    });

    if (role) {

      res.status(201).json(role);
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid role data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getRolesList = async (req, res) => {
  try {
    const roles = await Role.find().select("name");

    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await Role.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: true, message: "Role deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};