import React from 'react';
import {Badge} from "flowbite-react";

const Tags = ({tags  = []}) => {
    return (
        <>
            {tags.map((tag, index) => (
                <Badge
                    key={index}
                    color="indigo"
                    size="sm"

                >
                    #{tag}
                </Badge>
            ))}
        </>
    )
}

export default Tags;
