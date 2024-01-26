import React from 'react';

interface CollapsibleProps {
    title: string;
    children: React.ReactNode;
}

export default function Collapsible({ title, children }: CollapsibleProps) {
    return <div className='py-3'>
            <div
                className="rounded-xl shadow-lg bg-white">
                <h2>
                    <button
                        className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white pt-6 px-6 pb-3 text-left text-neutral-800 transition"
                        type="button"
                        data-te-collapse-init
                        data-te-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        { title }
                        <span
                            className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none  -te-collapse-collapsed]]:fill-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </button>
                </h2>
                <div
                    className="!visible"
                    data-te-collapse-item
                    data-te-collapse-show
                    aria-labelledby="headingOne"
                    data-te-parent="#accordionExample">
                    <div className="pt-3 pb-6 px-6 w-full">
                        {children}
                    </div>
                </div>
            </div>
    </div>;
}
