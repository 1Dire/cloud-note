import React from "react";
import {Card} from "flowbite-react";
import {Outlet} from "react-router-dom";

const Contents = () => {
    return (
        <main className="p-4 md:p-6 bg-gray-200 dark:bg-gray-950 h-full text-gray-700 dark:text-gray-300">
            <div className="mx-auto w-full">
                <Card className="w-full p-1 mb-4 shadow-md bg-white dark:bg-gray-900">
                    <Outlet/>
                </Card>
            </div>
        </main>
    );
};

export default Contents;
