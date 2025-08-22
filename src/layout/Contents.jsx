import React from "react";
import { Card } from "flowbite-react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop.jsx";

const Contents = () => {
    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-200 dark:bg-gray-950 text-gray-700 dark:text-gray-300">
            <ScrollToTop />
            <div className="mx-auto w-full">
                <Card className="w-full p-1 mb-4 shadow-md bg-white dark:bg-gray-900">
                    <Outlet />
                </Card>
            </div>
        </main>
    );
};

export default Contents;