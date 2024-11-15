import React from 'react';

const Title = ({ text1, text2 }) => {
    return (
      <div className="flex text-center my-4 gap-2">
        <p className="text-lg font-bold text-gray-800">
          {text1}
        </p>
        <p className="text-lg text-gray-500 ">
          {text2}
        </p>
      </div>
    );
  };

export default Title;
