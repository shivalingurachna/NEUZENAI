import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import Modal from '../common/Modal';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Custom Centered 30px Event Badge Renderer with Click Modal Trigger
const CustomEvent = ({ event, onSelectEvent }) => {
  let dotBg = 'bg-sky-500';
  let badgeColor = 'text-sky-700 bg-sky-50 border-sky-200';
  if (event.type === 'leave') {
    dotBg = 'bg-rose-500';
    badgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
  } else if (event.type === 'holiday') {
    dotBg = 'bg-emerald-500';
    badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  } else if (event.type === 'onboarding') {
    dotBg = 'bg-amber-500';
    badgeColor = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  return (
    <div
      onClick={() => onSelectEvent(event)}
      className="group relative inline-flex items-center justify-center gap-1 cursor-pointer py-0.5 px-1 rounded-md hover:bg-sky-100/80 transition-all w-[30px] max-w-[30px] mx-auto overflow-hidden flex-shrink-0"
    >
      {/* Centered Indicator Dot */}
      <span className={`w-2.5 h-2.5 rounded-full ${dotBg} shadow-xs ring-1 ring-white flex-shrink-0`}></span>
      
      {/* 30px Truncated Text */}
      <span className="text-[9px] font-bold text-slate-700 truncate w-[14px] block text-center group-hover:text-sky-700 transition-colors">
        {event.title}
      </span>

      {/* Hover Preview Card */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-56 p-3 bg-white rounded-2xl border border-sky-100 shadow-xl shadow-sky-900/15 text-left space-y-1.5 pointer-events-none transition-all">
        <div className="flex items-center justify-between">
          <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border ${badgeColor}`}>
            {event.type}
          </span>
          <span className="text-[10px] font-mono font-semibold text-slate-400">Click to view</span>
        </div>
        <p className="font-bold text-xs text-slate-900 leading-snug truncate">{event.title}</p>
      </div>
    </div>
  );
};

const CalendarView = ({ events = [] }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedEvents = events.map((evt) => ({
    id: evt._id,
    title: evt.title,
    start: new Date(evt.startDate),
    end: new Date(evt.endDate || evt.startDate),
    type: evt.type,
    description: evt.description,
  }));

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: '0px',
        margin: '2px auto',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '30px',
        overflow: 'visible',
      },
    };
  };

  return (
    <div className="h-[640px] bg-white p-6 rounded-3xl border border-sky-100 shadow-sm font-outfit text-slate-800 text-xs">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        components={{
          event: (props) => <CustomEvent {...props} onSelectEvent={handleSelectEvent} />,
        }}
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'agenda']}
        defaultView="month"
      />

      {/* Full Event Details Modal on Click */}
      {selectedEvent && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Calendar Event Details"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <span className={`text-xs uppercase font-bold px-2.5 py-1 rounded-md border ${
                selectedEvent.type === 'leave' ? 'text-rose-700 bg-rose-50 border-rose-200' :
                selectedEvent.type === 'holiday' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                selectedEvent.type === 'onboarding' ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-sky-700 bg-sky-50 border-sky-200'
              }`}>
                {selectedEvent.type}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {selectedEvent.start.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 font-outfit">{selectedEvent.title}</h3>
              <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 whitespace-pre-wrap">
                {selectedEvent.description || 'No additional description provided for this calendar event.'}
              </p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Close Details
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalendarView;
