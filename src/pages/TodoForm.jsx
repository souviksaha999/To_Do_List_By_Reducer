import React from 'react';
import { useForm } from 'react-hook-form';

const TodoForm = ({ onSubmit }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}
      style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }} >

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
        <input type="text" placeholder="Enter title" {...register('title', { required: 'Title is required' })}
          style={{ width: '100%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.title && ( <p style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>  {errors.title.message} </p> )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
        <input
          type="text" {...register('description', { required: 'Description is required' })}
          style={{  width: '100%', padding: '8px',  fontSize: '16px',  border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter description" />
        {errors.description && (<p style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>
            {errors.description.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>End Date:</label>
        <input
          type="date"
          {...register('endDate', { required: 'End date is required' })}
          style={{ width: '100%', padding: '8px',  fontSize: '16px', border: '1px solid #ccc',  borderRadius: '4px' }} />
        {errors.endDate && (
          <p style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>
            {errors.endDate.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        style={{  backgroundColor: '#4CAF50', color: 'white',  padding: '10px 20px',  border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} >
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
