/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Dropdown } from '../Dropdown/Dropdown';

import './Form.scss';

const countries: { [key: string]: string[] } = {
  USA: ['New York', 'Los Angeles'],
  Estonia: ['Johvi', 'Tallinn'],
  Ukraine: ['Kyiv', 'Dnipro'],
};

type Inputs = {
  firstName: string,
  lastName: string,
  email: string,
  country: string,
  city: string,
  address: string,
  zipCode: string,
  phone: string,
};

export const Form: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Inputs>();
  const handleCountryChange = (item: string) => {
    setSelectedCountry(item);
    setValue('country', item, { shouldValidate: true });
    setValue('city', '', { shouldValidate: true });
  };

  const onReset = () => {
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('email', '');
    setValue('country', '');
    setValue('city', '');
    setValue('address', '');
    setValue('zipCode', '');
    setValue('phone', '');
    setSelectedCountry('');
  };

  const onSubmit: SubmitHandler<Inputs> = () => {
    setIsSuccess(true);
    onReset();
  };

  return (
    <>
      <form
        action="#"
        method="POST"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form__label" htmlFor="firstName">
          {errors.firstName && errors.firstName.type === 'required' && (
            <p className="form__input-error">
              First name is required
            </p>
          )}

          {errors.firstName && errors.firstName.type === 'pattern' && (
            <p className="form__input-error">
              {errors.firstName.message}
            </p>
          )}

          <input
            className="form__input"
            placeholder="First name"
            id="firstName"
            {...register('firstName', {
              required: 'required',
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Please, enter only English letters without digits',
              },
            })}
          />
        </label>

        <label className="form__label" htmlFor="lastName">
          {errors.lastName && errors.lastName.type === 'required' && (
            <p className="form__input-error">
              Last name is required
            </p>
          )}

          {errors.firstName && errors.firstName.type === 'pattern' && (
            <p className="form__input-error">
              {errors.lastName?.message}
            </p>
          )}

          <input
            className="form__input"
            placeholder="Last name"
            id="lastName"
            {...register('lastName', {
              required: 'required',
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Please, enter only English letters without digits',
              },
            })}
          />
        </label>

        <label className="form__label" htmlFor="email">
          {errors.email && errors.email.type === 'required' && (
            <p className="form__input-error">
              Email is required
            </p>
          )}

          {errors.email && errors.email.type === 'pattern' && (
            <p className="form__input-error">
              {errors.email?.message}
            </p>
          )}

          {errors.email && errors.email.type === 'containsRussianLetters' && (
            <p className="form__input-error">
              Email should not contain russian letters
            </p>
          )}

          <input
            className="form__input"
            placeholder="Email"
            id="email"
            {...register('email', {
              required: 'required',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email did not match required format',
              },
              validate: {
                containsRussianLetters: value => !/[\u0400-\u04FF]/.test(value),
              },
            })}
          />
        </label>

        <label htmlFor="country" className="form__label">
          {errors.country && errors.country.type === 'required' && (
            <p className="form__input-error">
              Country is required
            </p>
          )}

          <Dropdown
            options={Object.keys(countries)}
            placeholder="Select country"
            onChange={handleCountryChange}
            defaultValue={watch().country}
          />

          <input
            className="form__input form__input--hidden"
            id="country"
            {...register('country', {
              required: 'required',
            })}
            onChange={(event) => setSelectedCountry(event.target.value)}
          />
        </label>

        <label htmlFor="city" className="form__label">
          {errors.city && errors.city.type === 'required' && (
            <p className="form__input-error">
              City is required
            </p>
          )}

          <Dropdown
            disabled={!selectedCountry}
            options={countries[selectedCountry]}
            placeholder="Select city"
            defaultValue={watch().city}
            onChange={(item: string) => setValue('city', item, { shouldValidate: true })}
          />

          <input
            className="form__input form__input--hidden"
            id="city"
            {...register('city', {
              required: 'required',
            })}
          />
        </label>

        <label className="form__label" htmlFor="address">
          {errors.address && errors.address.type === 'required' && (
            <p className="form__input-error">
              Adress is required
            </p>
          )}

          {errors.address && errors.address.type === 'pattern' && (
            <p className="form__input-error">
              {errors.address?.message}
            </p>
          )}

          <input
            className="form__input"
            placeholder="Address"
            id="address"
            {...register('address', {
              required: 'required',
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Please, enter only English letters without digits',
              },
            })}
          />
        </label>

        <label className="form__label" htmlFor="zipCode">
          {errors.zipCode && errors.zipCode.type === 'required' && (
            <p className="form__input-error">
              ZIP Code is required
            </p>
          )}

          {errors.zipCode && errors.zipCode.type === 'pattern' && (
            <p className="form__input-error">
              {errors.zipCode?.message}
            </p>
          )}

          {errors.zipCode && errors.zipCode.type === 'format' && (
            <p className="form__input-error">
              ZIP Code must be 6 characters
            </p>
          )}

          <input
            className="form__input"
            placeholder="ZIP Code"
            id="zipCode"
            {...register('zipCode', {
              required: 'required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Please, enter only digits',
              },
              validate: {
                format: (value) => value.length === 6,
              },
            })}
          />
        </label>

        <label className="form__label" htmlFor="phone">
          {errors.phone && errors.phone.type === 'required' && (
            <p className="form__input-error">
              Phone number is required
            </p>
          )}

          {errors.phone && errors.phone.type === 'pattern' && (
            <p className="form__input-error">
              {errors.phone?.message}
            </p>
          )}

          <input
            className="form__input"
            placeholder="Phone number"
            id="phone"
            {...register('phone', {
              required: 'required',
              pattern: {
                value: /^\d{3}-\d{4}$/,
                message: 'Phone number did not match required format: 000-0000',
              },
            })}
          />
        </label>

        <button
          type="submit"
          className="form__button"
        >
          Submit
        </button>
      </form>

      {isSuccess && (
        <p
          className="form__success"
        >
          All field are correct! Well done!
        </p>
      )}
    </>
  );
};
