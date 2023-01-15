import React from 'react';

const Button = ({children}) => {
    return (
        <button className="px-10 py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">{children}</button>
    );
};

export default Button;