"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [vacationStart, setVacationStart] = useState("");
  const [vacationEnd, setVacationEnd] = useState("");
  const [vacationPeriods, setVacationPeriods] = useState([]); 

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !position || !hireDate || vacationPeriods.length === 0) {
      alert("Todos os campos são necessários.");
      return;
    }

    const twelveMonthsFromHireDate = new Date(hireDate);
    twelveMonthsFromHireDate.setFullYear(twelveMonthsFromHireDate.getFullYear() + 1);

    const vacations = []; 

    
    for (const period of vacationPeriods) {
      const vacationStartDate = new Date(period.start);
      const vacationEndDate = new Date(period.end);

      if (vacationStartDate < twelveMonthsFromHireDate) {
        alert("O primeiro período de férias deve começar pelo menos 12 meses após a data de contratação.");
        return;
      }

      const overlappingVacation = vacations.find((vacation) => {
        const startDate = new Date(vacation.start);
        const endDate = new Date(vacation.end);
        return (
          (vacationStartDate >= startDate && vacationStartDate <= endDate) ||
          (vacationEndDate >= startDate && vacationEndDate <= endDate)
        );
      });

      if (overlappingVacation) {
        alert("As datas de férias se sobrepõem a um período de férias existente.");
        return;
      }

      const daysDifference = (vacationEndDate - vacationStartDate) / (1000 * 3600 * 24);
      if (daysDifference < 5) {
        alert("O período de férias não pode ser inferior a 5 dias.");
        return;
      }

      vacations.push({ start: vacationStartDate, end: vacationEndDate });
    }

    
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          position,
          hireDate,
          vacationPeriods, 
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Falha ao criar!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleAddVacationPeriod = () => {
    if (vacationStart && vacationEnd) {
      const vacationStartDate = new Date(vacationStart);
      const vacationEndDate = new Date(vacationEnd);

      
      const daysDifference = (vacationEndDate - vacationStartDate) / (1000 * 3600 * 24);
      if (daysDifference < 5) {
        alert("O período de férias não pode ser inferior a 5 dias.");
        return;
      }
      if (vacationPeriods.length === 0 && daysDifference < 14) {
        alert("O primeiro período de férias deve ter pelo menos 14 dias.");
        return;
      }

      setVacationPeriods([...vacationPeriods, {  start: vacationStartDate.toISOString(), end: vacationEndDate.toISOString() }]);
      setVacationStart("");
      setVacationEnd("");
    }
  };




  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="name">Name</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Name"
      />
      
      <label htmlFor="position">Position</label>
      <input
        onChange={(e) => setPosition(e.target.value)}
        value={position}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Position"
      />
      
      <label htmlFor="vacationHire">Hire Date</label>
      <input
        onChange={(e) => setHireDate(e.target.value)}
        value={hireDate}
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Date of Hire"
      />

      <label htmlFor="vacationStart">Vacation Start</label>
      <input
        onChange={(e) => setVacationStart(e.target.value)}
        value={vacationStart}
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Vacation Start Date"
      />

      <label htmlFor="vacationEnd">Vacation End</label>
      <input
        onChange={(e) => setVacationEnd(e.target.value)}
        value={vacationEnd}
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Vacation End Date"
      />

      <button
        type="button"
        onClick={handleAddVacationPeriod} 
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Vacation Period
      </button>

      {/* Exibição dos períodos de férias adicionados */}
      {vacationPeriods.map((period, index) => (
        <div key={index}>
          <p>Vacation Period {index + 1}</p>
          <p>Start: {period.start}</p>
          <p>End: {period.end}</p>
        </div>
      ))}

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Employee and Vacation
      </button>
    </form>
  );
}
