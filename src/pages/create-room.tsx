import { Navigate } from 'react-router-dom';
import { CreateRoomForm } from '@/components/create-room-form';
import { Navbar } from '@/components/navbar';
import { RoomList } from '@/components/room-list';
import { getToken } from '@/lib/token';

export function CreateRoom() {
  if (!getToken()) {
    return <Navigate replace to="/" />;
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="gap grid items-start gap-8 sm:grid-cols-1 md:grid-cols-2">
            <CreateRoomForm />
            <RoomList />
          </div>
        </div>
      </div>
    </>
  );
}
