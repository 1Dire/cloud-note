// src/components/BlockCode.jsx
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const BlockCode = ({ code, children, language }) => {
    return (
        <div className="not-prose my-4 rounded-lg overflow-hidden shadow-md">
            <SyntaxHighlighter language={language} style={oneDark} wrapLongLines={true}>
                {code || children}
            </SyntaxHighlighter>
        </div>
    );
};

export default BlockCode;