import React from 'react';

const InlineCode = ({children}) => {
    return (
        <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm font-mono">
            {children}
        </code>
    );
}

export default InlineCode;
