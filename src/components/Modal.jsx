import { IconX } from "@tabler/icons-react";

const Modal = ({
  showModal,
  onCloseModal,
  handleSubmit,
  register,
  createUser,
  isUpdating,
  updateUser,
  errors,
}) => {
  const submit = (currentUser) => {
    isUpdating ? updateUser(currentUser) : createUser(currentUser);
  };
  console.log(errors);
  const titleForm = isUpdating ? "Actualizar usuario" : "Crear usuario";
  const textButtonSubmit = isUpdating ? "Guardar cambios" : "Crear";

  return (
    <section
      className={`fixed bg-black/60 top-0 left-0 right-0 h-screen flex justify-center items-center transition-all p-2 ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="grid gap-4 [&>label]:grid [&>label]:gap-1 [&>label>span>span]:text-red-500 [&>label>span]:text-sm [&>label>span]:font-semibold bg-white p-4 rounded-md relative w-[min(100%,_280px)]"
      >
        <button
          onClick={onCloseModal}
          type="button"
          className="absolute top-2 right-2 hover:text-red-500 transition-colors"
        >
          <IconX size={20} />
        </button>
        <h2 className="text-center font-semibold">{titleForm}</h2>
        <label>
          <span>
            Nombre: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="text"
            {...register("first_name", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              maxLength: {
                value: 25,
                message: "Escribe maximo 25 caracteres",
              },
              minLength: {
                value: 1,
                message: "Escribe minimo 1 caracter",
              },
            })}
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs">{errors.first_name.message}</span>
          )}
        </label>
        <label>
          <span>
            Apellidos: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="text"
            {...register("last_name", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              maxLength: {
                value: 25,
                message: "Escribe maximo 25 caracteres",
              },
              minLength: {
                value: 1,
                message: "Escribe minimo 1 caracter",
              },
            })}
          />
          {errors.last_name && (
            <span className="text-red-500 text-xs">{errors.last_name.message}</span>
          )}
        </label>
        <label>
          <span>
            Correo: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              maxLength: {
                value: 150,
                message: "Escribe maximo 150 caracteres",
              },
              minLength: {
                value: 1,
                message: "Escribe minimo 1 caracter",
              },
            })}
          />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </label>
        <label>
          <span>
            Contraseña: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="text"
            {...register("password", {
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message: "La constraseña debe tener entre 6 y 16 caracteres, ademas de tener al menos un número y un caracter especial",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </label>
        <label>
          <span>
            Cumpleaños: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="date"
            {...register("birthday")}
          />
        </label>
        <button
          type="submit"
          className="bg-purple-700 text-white font-semibold p-2 rounded-md hover:bg-purple-900 transition-all"
        >
          {textButtonSubmit}
        </button>
      </form>
    </section>
  );
};
export default Modal;