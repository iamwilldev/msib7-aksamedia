import React, { useEffect, useState } from "react";
import { axiosClient2 } from "../axiosClient";

const Task4 = () => {
  const [nilaiRT, setNilaiRT] = useState([]);
  const [nilaiST, setNilaiST] = useState([]);

  useEffect(() => {
    axiosClient2.get("/nilaiRT").then(({ data }) => {
      setNilaiRT(data);
    });
    axiosClient2.get("/nilaiST").then(({ data }) => {
      setNilaiST(data);
    });
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto mb-10">
        <div className="mx-auto justify-center w-5/6">
          <div className="">
            <h1 className="text-5xl text-gray-700 text-center">TASK 4</h1>
            <p className=" text-gray-700">Petunjuk</p>
            <ol className="text-gray-700">
              <li>
                Untuk nilai RT menggunakan <b>materi_uji_id 7</b>, tetapi tidak
                mengikutkan <b>pelajaran_khusus</b>
              </li>
              <li>
                Untuk nilai ST menggunakan <b>materi_uji_id 4</b>
              </li>
              <li>
                untuk <b>pelajaran_id 44 dikali 41.67</b>
              </li>
              <li>
                untuk <b>pelajaran_id 45 dikali 29.67</b>
              </li>
              <li>
                untuk <b>pelajaran_id 46 dikali 100</b>
              </li>
              <li>
                untuk <b>pelajaran_id 47 dikali 23.81</b>
              </li>
            </ol>
          </div>
          <div className="mb-[100px]">
            <h1 className="text-2xl text-gray-700 mt-4">
              1. Endpoint <b>/nilaiRT</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Hasil Yang Diinginkan</label>
                <img
                  src="https://notion.so/eap/proxy/files/2ce94db0-df53-41ed-9dd8-6ae2de961c7c"
                  alt="nilai-RT"
                  className="w-full lg:w-[50%] h-full lg:h-[50%] mt-4"
                />
              </li>
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md">
                  <code className="text-gray-700">{`GET ${axiosClient2.defaults.baseURL}/nilaiRT`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(nilaiRT, null, 2)}
                  </code>
                </pre>
              </li>
            </ul>
            <h1 className="text-2xl text-gray-700 mt-4">
              2. Endpoint <b>/nilaiST</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Hasil Yang Diinginkan</label>
                <img
                  src="https://notion.so/eap/proxy/files/1f4babda-a546-4a5a-be48-7191145ca3e9"
                  alt="nilai-ST"
                  className="w-full lg:w-[50%] h-full lg:h-[50%] mt-4"
                />
              </li>
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md">
                  <code className="text-gray-700">{`GET ${axiosClient2.defaults.baseURL}/api/nilaiST`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(nilaiST, null, 2)}
                  </code>
                </pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task4;
