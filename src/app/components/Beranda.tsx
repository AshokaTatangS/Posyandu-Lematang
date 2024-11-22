"use client";

import "@fullcalendar/react";
import "@fullcalendar/daygrid";
import "@fullcalendar/timegrid";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EventSourceInput } from "@fullcalendar/core/index.js";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
  description: string;  // Menambahkan field description
}

export default function CalendarApp() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
    description: "", // Menambahkan description pada state
  });

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() });
    setShowAddModal(true);
  }

  function handleEventClick(eventInfo: any) {
    const clickedEvent = allEvents.find((event) => event.id === Number(eventInfo.event.id));
    setSelectedEvent(clickedEvent || null); // Simpan event yang diklik
    setShowDeleteModal(true);
  }

  function handleDeleteEvent() {
    if (selectedEvent) {
      setAllEvents(allEvents.filter((event) => event.id !== selectedEvent.id));
    }
    setShowDeleteModal(false);
    setSelectedEvent(null);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewEvent({
      ...newEvent,
      description: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]); // Masukkan event baru ke dalam daftar
    setShowAddModal(false);
    setNewEvent({ title: "", start: "", allDay: false, id: 0, description: "" }); // Reset setelah submit
  }

  return (
    <div className="min-h-screen bg-[#E9FFE9] font-sans">
      {/* Header */}
      <header className="bg-[#63C96B] text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">LEMANDU</h1>
        <nav className="space-x-6">
          <a href="#beranda" className="hover:underline">
            Beranda
          </a>
          <a href="#kalender" className="hover:underline">
            Kalender
          </a>
          <a href="#statistik" className="hover:underline">
            Statistik
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-[#4F874F] mb-8">
          Kalender Kegiatan Posyandu Lematang
        </h2>
        <div className="w-[80%] mx-auto text-black">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            events={allEvents as EventSourceInput}
            nowIndicator={true}
            editable={true}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={(eventInfo) => (
              <div>
                <strong>{eventInfo.event.title}</strong> {/* Tampilkan judul */}
                <div>{eventInfo.event.extendedProps.description}</div> {/* Tampilkan deskripsi */}
              </div>
            )}
          />
        </div>
      </main>

      {/* Modals */}
      {/* Add Event Modal */}
      <Transition.Root show={showAddModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowAddModal(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" leave="ease-in duration-200">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Add Event</h3>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="block w-full p-2 border text-black rounded-md mb-4"
                    value={newEvent.title}
                    onChange={handleChange}
                    placeholder="Event Title"
                    required
                  />
                  <textarea
                    className="block w-full p-2 border text-black rounded-md mb-4"
                    value={newEvent.description}
                    onChange={handleDescriptionChange}
                    placeholder="Event Description"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Add Event
                  </button>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Delete Event Modal */}
      <Transition.Root show={showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowDeleteModal(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" leave="ease-in duration-200">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center text-black justify-center p-4">
              <Dialog.Panel className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Delete Event</h3>
                {selectedEvent && (
                  <div>
                    <p>
                      Are you sure you want to delete <b>{selectedEvent.title}</b>?
                    </p>
                    <p className="mt-2"><strong>Description:</strong> {selectedEvent.description}</p> {/* Menampilkan deskripsi */}
                  </div>
                )}
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteEvent}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
