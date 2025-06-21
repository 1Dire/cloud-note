import React from 'react';

const BlockCode = ({children}) => {
    return (<pre
        className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 text-sm p-4 rounded-md overflow-x-auto font-mono my-2">
    <code>{children}</code>
  </pre>);
}

export default BlockCode;
