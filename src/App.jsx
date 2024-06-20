import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { clsx } from 'clsx'
export default function App() {
  const [koders, setkoders] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset
  } = useForm()


  function onSubmit(data) {
    console.log('onSubmint', data)
    setkoders([
      ...koders,
      { name: data.name, lastName: data.lastName, email: data.email }
    ])
    reset()
  }

  function removekoder(index) {
    const newkoders = koders.filter((koder, idx) => idx !== index)
    setkoders(newkoders)
  }

  return (
    <main className='w-full min-h-screen flex flex-col '>
      <h1 className='text-center text-[2rem] text-white/80 font-bold p-2 bg-teal-600'>
        Lista de Koders
      </h1>
      <form
        className='flex flex-row flex-wrap md:flex-nowrap gap-2 justify-center p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type='text'
          className={clsx(
            'p-2 rounded text-black w-full max-w-screen-sm text-center',
            {
              'border-red-500 bg-red-200 border-2': errors.koder
            }
          )}
          placeholder='ingresa tu nombre'
          {...register('name', {
            required: { value: true, message: 'El campo es requerido' },
            minLength: { value: 3, message: 'Minimo 3 caracteres' },
            maxLength: { value: 180, message: 'Maximo 180 caracteres' }
          })}
        />
        <input
          type='text'
          className={clsx(
            'p-2 rounded text-black w-full max-w-screen-sm text-center',
            {
              'border-red-500 bg-red-200 border-2': errors.koder
            }
          )}
          placeholder='ingresa tu apellido'
          {...register('lastName', {
            required: { value: true, message: 'El campo es requerido' },
            minLength: { value: 3, message: 'Minimo 3 caracteres' },
            maxLength: { value: 180, message: 'Maximo 180 caracteres' }
          })}
        />
        <input
          type='email'
          className={clsx(
            'p-2 rounded text-black w-full max-w-screen-sm text-center',
            {
              'border-red-500 bg-red-200 border-2': errors.koder
            }
          )}
          placeholder='ingresa tu email'
          {...register('email', {
            required: { value: true, message: 'El campo es requerido' },
            minLength: { value: 3, message: 'Minimo 3 caracteres' },
            maxLength: { value: 180, message: 'Maximo 180 caracteres' }
          })}
        />
        <button
          disabled={isSubmitted ? !isValid : false}
          className='bg-blue-600 w-full sm:w-10 text-white px-3 rounded cursor-pointer  transition-colors duration-300 hover:bg-blue-700 hover:text-white disabled:bg-stone-400 disabled:text-white disabled:cursor-not-allowed'
        >
          +
        </button>
      </form>
      {errors.koder && (
        <p className='text-center font-semibold text-red-600 text-md'>
          {errors.koder?.message}
        </p>
      )}
      <div className='max-w-screen-sm w-full mx-auto p-3 flex flex-col gap-1'>
        {koders.length === 0 && (
          <div className='text-white/50 text-center'>
            No hay koders registrados
          </div>
        )}

        {koders.map((koder, idx) => {
          return (
            <div
              key={`koder-${idx}`}
              className='bg-white/20 rounded pr-4 pl-4 flex flex-row justify-between items-center'
            >
              <p>-{koder.name} {koder.lastName} </p>
              <p>-{koder.email}</p>
              <span
                className='text-[37px] text-white cursor-pointer select-none hover:transform hover:scale-110 transition-transform hover:text-red-700'
                onClick={() => removekoder(idx)}
              >
                x
              </span>
            </div>
          )
        })}
      </div>
    </main>
  )
}
