import { Popover, Transition } from '@headlessui/react'
import React from 'react'
import { getInitials } from '../utils'
import { Fragment } from 'react'

const UserInfo = ({user}) => {
  return (
    <div className='px-4'>
        <Popover className='relative'>
            {({ open }) => <>
            <Popover.Button className='group inline-flex items-center outline-none'>
                <span>
                    {getInitials(user?.name)}
                </span>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-90 max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                    <div className='flex items-center gap-4 rounded-lg shadow-lg bg-white p-4'>
                        <div className='w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl'>
                            <span>
                                {getInitials(user?.name)}
                            </span>
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <p className='text-black text-xl font-bold'>
                                {user?.name}
                            </p>
                            <span className='text-base text-gray-500'>{user.title}</span>
                            <span className=' text-blue-500'>{user.email}</span>
                        </div>

                    </div>

                </Popover.Panel>

            </Transition>
            </>}
        </Popover>
    </div>
  )
}

export default UserInfo;