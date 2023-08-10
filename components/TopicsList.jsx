"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Falha ao buscar tópicos");
    }

    const data = await res.json();
    return data.topics; 
  } catch (error) {
    console.log("Erro ao carregar os topicos: ", error);
    return []; 
  }
};

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsData = await getTopics();
      setTopics(topicsData);
    };

    fetchTopics();
  }, []);

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.name}</h2>
            <div>{t.position}</div>
            <div>{t.hireDate}</div>      
             <div>
              {t.vacations && t.vacations.map((vacation, index) => (
                <div key={index}>
                  <p>Vacation Period {index + 1}</p>
                  <p>Start: {vacation.start}</p>
                  <p>End: {vacation.end}</p>
                </div>
              ))}
            </div> 
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
