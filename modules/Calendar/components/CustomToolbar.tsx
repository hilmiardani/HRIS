import React from 'react';
import { ToolbarProps, NavigateAction } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

interface CustomToolbarProps extends ToolbarProps {
  onNavigate: (action: NavigateAction, date?: Date | undefined) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ date, onNavigate }) => {
  const formattedDate = dayjs(date).format('MMMM YYYY');

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-lg font-bold">{formattedDate}</div>
      <div className="flex items-center space-x-2">
        <button type="button" onClick={() => onNavigate('TODAY')} className="outline outline-1 px-2 py-1 rounded">
          Today
        </button>
        <button type="button" onClick={() => onNavigate('PREV')} className="outline outline-1 px-2 py-1 rounded">
          {"<"} Back
        </button>
        <button type="button" onClick={() => onNavigate('NEXT')} className="outline outline-1 px-2 py-1 rounded">
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
