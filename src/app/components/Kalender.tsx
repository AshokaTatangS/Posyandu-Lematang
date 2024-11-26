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
  start: Date | string;
  allDay: boolean;
  id: number;
  description: string;
  location: string;
}

export default function CalendarApp() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    start: "",
    allDay: false,
    id: 0,
    description: "",
    location: "",
  });
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filtered Events
  const filteredEvents = filterLocation
    ? allEvents.filter((event) => event.location === filterLocation)
    : allEvents;

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() });
    setShowAddModal(true);
  }

  function handleEventClick(eventInfo: any) {
    const clickedEvent = allEvents.find((event) => event.id === Number(eventInfo.event.id));
    setSelectedEvent(clickedEvent || null);
    setShowDeleteModal(true);
  }

  function handleDeleteEvent() {
    if (selectedEvent) {
      setAllEvents(allEvents.filter((event) => event.id !== selectedEvent.id));
    }
    setShowDeleteModal(false);
    setSelectedEvent(null);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewEvent({
      ...newEvent,
      description: e.target.value,
    });
  }

  function handleLocationChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setNewEvent({
      ...newEvent,
      location: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowAddModal(false);
    setNewEvent({ start: "", allDay: false, id: 0, description: "", location: "" });
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="py-8 px-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Kalender Kegiatan Posyandu Lematang
        </h2>
        <div className="w-[80%] mx-auto text-black relative">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "filter",
            }}
            events={filteredEvents.map((event) => ({
              ...event,
              title: event.location, // Gunakan location sebagai title
            })) as EventSourceInput}
            nowIndicator={true}
            editable={true}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={(eventInfo) => (
              <div>
                <strong>{eventInfo.event.title}</strong> {/* Tampilkan location sebagai title */}
                <div>{eventInfo.event.extendedProps.description}</div> {/* Tampilkan deskripsi */}
              </div>
            )}
            customButtons={{
              filter: {
                text: "Filter",
                click: () => {
                  setShowFilterDropdown(!showFilterDropdown); // Toggle dropdown
                },
              },
            }}
          />
          {/* Dropdown Filter */}
          {showFilterDropdown && (
            <div className="absolute top-16 right-0 bg-white shadow-lg rounded-md p-4 w-48 z-10">
              <label htmlFor="filter-location" className="block text-sm font-medium mb-2">
                Filter by Location
              </label>
              <select
                id="filter-location"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="block w-full p-2 border rounded-md text-black"
              >
                <option value="">All Locations</option>
                <option value="Lematang Atas">Lematang Atas</option>
                <option value="Lematang Bawah">Lematang Bawah</option>
                <option value="Lematang Sari">Lematang Sari</option>
                <option value="Lubuk Bais">Lubuk Bais</option>
                <option value="Mojo Songo">Mojo Songo</option>
                <option value="Rilau Gadis">Rilau Gadis</option>
                <option value="Kampung Sawah">Kampung Sawah</option>
                <option value="Jalan Baru">Jalan Baru</option>
              </select>
            </div>
          )}
        </div>
      </main>

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
                  <select
                    value={newEvent.location}
                    onChange={handleLocationChange}
                    className="block w-full p-2 border text-black rounded-md mb-4"
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="Lematang Atas">Lematang Atas</option>
                    <option value="Lematang Bawah">Lematang Bawah</option>
                    <option value="Lematang Sari">Lematang Sari</option>
                    <option value="Lubuk Bais">Lubuk Bais</option>
                    <option value="Mojo Songo">Mojo Songo</option>
                    <option value="Rilau Gadis">Rilau Gadis</option>
                    <option value="Kampung Sawah">Kampung Sawah</option>
                    <option value="Jalan Baru">Jalan Baru</option>
                  </select>
                  <textarea
                    className="block w-full p-2 border text-black rounded-md mb-4"
                    value={newEvent.description}
                    onChange={handleDescriptionChange}
                    placeholder="Event Description"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
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
                      Are you sure you want to delete the event at{" "}
                      <strong>{selectedEvent.location}</strong>?
                    </p>
                    <p className="mt-2">
                      <strong>Description:</strong> {selectedEvent.description}
                    </p>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleDeleteEvent}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
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
