import React from "react";
import InputField from "./InputField";
import { Path } from 'react-hook-form';
import { capitalizeFirstLetter } from "@/utils/text";

interface FormInputs {
  id?: number;
  firstName: string;
  lastName: string;
  percentage: number;
  createdAt?: string;
  [key: `percentage_${number}`]: number;
  [key: `firstName_${number}`]: string;
  [key: `lastName_${number}`]: string;
}

interface ParticipationData {
  id: number;
  firstName: string;
  lastName: string;
  percentage: number;
}

interface ParticipationTableProps {
  data: ParticipationData[];
  editingId: number | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number) => void;
  handleCancel: () => void;
  register: any; // Define this based on the actual use
  errors: any; // Define this based on the actual use
}

const ParticipationTable: React.FC<ParticipationTableProps> = ({
  data,
  editingId,
  onEdit,
  onDelete,
  onSave,
  handleCancel,
  register,
  errors,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-black">First name</th>
            <th className="py-2 px-4 text-black">Last name</th>
            <th className="py-2 px-4 text-black">Participation</th>
            <th className="py-2 px-4 text-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              editingId === row.id ? (
                <tr key={row.id} className="border-b">
                  <td>
                    <InputField
                      register={register}
                      name={`firstName_${row.id}`}
                      placeholder="First name"
                      options={{ required: 'First name is required' }}
                      error={errors[`firstName_${row.id}`]}
                      defaultValue={row.firstName}
                      className="w-full"
                    />
                  </td>
                  <td>
                    <InputField
                      register={register}
                      name={`lastName_${row.id}`}
                      placeholder="Last name"
                      options={{ required: "Last name is required" }}
                      error={errors[`lastName_${row.id}`]}
                      defaultValue={row.lastName}
                      className="w-full"
                    />
                  </td>
                  <td>
                    <InputField
                      register={register}
                      name={`percentage_${row.id}`}
                      placeholder="Participation"
                      type="number"
                      options={{ required: "Participation is required", valueAsNumber: true }}
                      error={errors[`percentage_${row.id}`]}
                      defaultValue={row.percentage}
                      className="w-full"
                    />
                  </td>
                  <td>
                    <div className="flex flex-col md:flex-row gap-2">
                      <button 
                        onClick={() => onSave(row.id)} 
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto"
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleCancel} 
                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full md:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={row.id} className="border-b">
                  <td className="text-center text-black">{capitalizeFirstLetter(row.firstName)}</td>
                  <td className="text-center text-black">{capitalizeFirstLetter(row.lastName)}</td>
                  <td className="text-center text-black">{row.percentage}%</td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => onEdit(row.id)} 
                        className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full md:w-auto"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(row.id)} 
                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full md:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipationTable;
