import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import UserList from "./components/UserList";

const BASE_URL = "https://users-crud.academlo.tech";

function App() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: "",
    });
    setUserToEdit(null);
  };

  const handleUpdateUser = (user) => {
    handleOpenModal();
    setUserToEdit(user);
  };

  const createUser = (newUser) => {
    axios
      .post(BASE_URL + "/users/", newUser)
      .then(({ data: newUser }) => {
        setUsers([...users, newUser]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (idUserToDelete) => {
    axios
      .delete(BASE_URL + `/users/${idUserToDelete}/`)
      .then(() => {
        const newUsers = users.filter(
          (user) => user.id !== idUserToDelete
        );
        setUsers(newUsers);
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (user) => {
    axios
      .patch(BASE_URL + `/users/${userToEdit.id}/`, user)
      .then(({ data: updatedUser }) => {
        const newUsers = users.map((user) =>
          user.id === userToEdit.id ? updatedUser : user
        );
        setUsers(newUsers);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/users/")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (userToEdit !== null) {
      reset(userToEdit);
    }
  }, [userToEdit]);

  return (
    <main className="text-[18px]">
      <header className="flex justify-between p-2">
        <h1 className="text-center p-2 font-bold text-[30px]">Usuarios</h1>
        <button
          className="bg-purple-700 text-white font-semibold px-3 rounded-2x1 hover:bg-purple-900 transition-all flex gap-4 items-center text-[16px]"
          
          onClick={handleOpenModal}
        >
          <IconPlus /> Crear nuevo usuario 
        </button>
      </header>
      <Modal
        showModal={showModal}
        onCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        register={register}
        createUser={createUser}
        isUpdating={!!userToEdit}
        updateUser={updateUser}
        errors={errors}
      />
      <UserList
        users={users}
        deleteUser={deleteUser}
        handleUpdateUser={handleUpdateUser}
      />
    </main>
  );
}

export default App;
