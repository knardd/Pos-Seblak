import React from "react";
import { Trash2, SquarePen, Inbox } from "lucide-react";

const AdminTable = ({ 
    columns, 
    data, 
    onEdit, 
    onDelete, 
    emptyMessage = "Data belum tersedia" 
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-y border-gray-100 text-gray-600 text-left">
                        {columns.map((col, index) => (
                            <th 
                                key={index} 
                                className={`px-4 py-2 font-bold text-[11px] uppercase tracking-wider ${col.className || ""}`}
                            >
                                {col.label}
                            </th>
                        ))}
                        <th className="px-4 py-2 font-bold text-[11px] uppercase tracking-wider text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.map((item, rowIndex) => (
                        <tr
                            key={item.id || rowIndex}
                            className="hover:bg-blue-50/30 transition-colors duration-200 group"
                        >
                            {columns.map((col, colIndex) => (
                                <td 
                                    key={colIndex} 
                                    className="px-4 py-3 text-sm text-gray-600"
                                >
                                    {col.render ? col.render(item) : item[col.key]}
                                </td>
                            ))}

                            <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 text-[10px] font-bold shadow-sm"
                                >
                                    <SquarePen size={12} />
                                    Edit
                                </button>

                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-200 text-[10px] font-bold shadow-sm"
                                >
                                    <Trash2 size={12} />
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <Inbox size={32} className="mb-2 opacity-30" />
                    <p className="text-[11px] font-medium">{emptyMessage}</p>
                </div>
            )}
        </div>
    );
};

export default AdminTable;
