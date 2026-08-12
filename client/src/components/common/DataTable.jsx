import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const DataTable = ({
  columns,
  data,
  isLoading,
  emptyTitle = 'No Records Found',
  emptyDescription,
}) => {
  if (isLoading) {
    return <LoadingSpinner text="Fetching data records..." />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-sky-100 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-sky-100 bg-sky-50/80 text-xs font-bold uppercase tracking-wider text-sky-900">
            {columns.map((col, index) => (
              <th key={index} className={`px-6 py-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-sky-100 text-sm text-slate-700">
          {data.map((row, rowIndex) => (
            <tr
              key={row._id || rowIndex}
              className="hover:bg-sky-50/50 transition-colors group"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
