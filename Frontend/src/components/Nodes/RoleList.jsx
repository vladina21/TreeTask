import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import { getInitials } from "../../utils";
import { MdCheck } from "react-icons/md";
import { useGetRolesListQuery } from "../../redux/slices/api/roleApiSlice";

const RoleList = ({ setRole, role }) => {
  const { data, isLoading, isError, refetch } = useGetRolesListQuery();
  const [selectedRole, setSelectedRole] = useState(null); // State for single selected role

  useEffect(() => {
    // Set default selected role when data is available
    if (!isLoading && data && data.length > 0) {
      setSelectedRole(data[0]); // Select the first role by default
      setRole(data[0]?.name); // Set default state for setRole to the name of the first role
    }
  }, [isLoading, data]); // Dependencies for useEffect

  const handleChange = (role) => {
    setSelectedRole(role);
    setRole(role?.name); // Set the role name when a role is selected
  };

  return (
    <div>
      <p className="text-gray-700">Assign User Role : </p>
      <Listbox value={selectedRole} onChange={(role) => handleChange(role)}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
            <span className="block truncate">{selectedRole?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data?.map((role, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      {
                        "bg-amber-100 text-amber-900":
                          active || selectedRole === role,
                        "text-gray-900": !active && selectedRole !== role,
                      }
                    )
                  }
                  value={role}
                >
                  {({ selected }) => (
                    <div
                      className={clsx(
                        "flex items-center gap-2 truncate",
                        selected ? "font-medium" : "font-normal"
                      )}
                    >
                      <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
                        <span className="text-center text-[10px]">
                          {getInitials(role.name)}
                        </span>
                      </div>
                      <span>{role.name}</span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default RoleList;
