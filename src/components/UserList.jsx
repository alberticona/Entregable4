import { IconEdit, IconTrashFilled, IconGift } from "@tabler/icons-react";

const UserList = ({ users, deleteUser, handleUpdateUser }) => {
  return (
    <section className="grid gap-6 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1200px] mx-auto py-10">
      {users.map((user) => (
        <article
          key={user.id}
          className="border-2 rounded-md py-2 px-4 hover:shadow-lg transition-shadow grid gap-2"
        >
          <h2 className="capitalize font-bold text-base line-clamp-1">
            {user.first_name} {user.last_name}
          </h2>
          <ul>
            <li>
              <span className="text-gray-400 font-semibold">CORREO:</span> {user.email}
            </li>
            <li>
              <span className="text-gray-400 font-semibold">CUMPLEAÑOS:  </span>
            </li>
            <li>
              <button
              className="gap 2border-2 rounded-md p-1 text-gray-500"
            >
              <IconGift />
              </button>
              {user.birthday}
            </li>
          </ul>
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdateUser(user)}
              className="border-2 rounded-md p-1 text-gray-500 bg-white hover:shadow-lg hover:bg-gray-300 transition-colors"
            >
              <IconEdit />
            </button>
            <button
              onClick={() => deleteUser(user.id)}
              className="border-2 rounded-md p-1 text-white bg-red-500 hover:shadow-lg hover:bg-red-400 transition-colors"
            >
              <IconTrashFilled />
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};
export default UserList;
