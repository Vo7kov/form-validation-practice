import React from 'react';

import { Form } from './Components/Form/Form';

import './App.scss';

// export const App2 = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register('example', { required: true })} />
//       {errors.example && <span>This field is required1</span>}

//       <input {...register('myTest', { required: true })} />
//       {errors.myTest && <span>This field is required2</span>}

//       <button type="submit">
//         Submit
//       </button>
//     </form>
//   );
// };

export const App: React.FC = () => (
  <div className="App">
    <Form />
  </div>
);
