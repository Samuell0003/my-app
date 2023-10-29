import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Profile from './Profile'
import { Session } from 'next-auth'

interface Props {
    open: boolean,
    closeProfile: () => void,
    user?: Session["user"]
}

export default function SlideOver(props: Props) {

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => props.closeProfile()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 w-80 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                onClick={() => props.closeProfile()}
                                                className="relative  text-white hover:text-white focus:outline-none  focus:ring-white"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className=''>
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                <div className="p-4">
                                                    <h1 className="text-x">Perfil</h1>
                                                </div>
                                            </Dialog.Title>
                                        </div>

                                        <Profile user={props.user} />

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}