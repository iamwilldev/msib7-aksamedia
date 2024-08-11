import React from "react";
import Employee from "./Employee";

const Task3 = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex mx-auto justify-center w-5/6">
          <div className="text-center">
            <h1 className="text-5xl text-gray-700">TASK 3</h1>
            <p>
              Integrasikan hasil dari Tugas 1 dan Tugas 2 sehingga menjadi
              sebuah website yang dinamis
            </p>
          </div>
        </div>
      </div>
      <Employee />
    </div>
  );
};

export default Task3;
