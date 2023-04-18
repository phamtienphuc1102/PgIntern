import { watch } from 'fs';
import { repeat, values } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { IGenderParams, ILocationParams, ISignUpParams, ISignUpValidation } from '../../../models/auth';
import { GENDER } from '../../intl/constants';
import { validateSignUp } from '../utils';

interface Props {
  onSignUp(values: ISignUpParams): void;
  loading: boolean;
  errorMessage: string;
  locations: Array<ILocationParams>;
  states: Array<ILocationParams>;
  onChangeRegion(idRegion: string): void;
}

type SignUpFormInputs = {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: string;
  state: string;
};

const SignUpFormV2 = (props: Props) => {
  const { onSignUp, loading, errorMessage, locations, states, onChangeRegion } = props;
  const [state, setStates] = useState('')
  const [region, setRegion] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInputs>({ mode: 'onChange' });

  const password = watch('password');
  // const region = watch('region');


  const onSubmit = (data: SignUpFormInputs) => {
    onSignUp(data);
  };

  const renderGender = () => {
    const arrGender: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {/* {' '} */}
        -- select an option --{' '}
      </option>,
    ];
    GENDER.map((g: IGenderParams, index: number) => {
      arrGender.push(
        <option value={g.value} key={index}>
          {g.label}
        </option>,
      );
    });
    return arrGender;
  };

  const renderRegion = () => {
    const arrRegion: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    locations.map((location: ILocationParams, index: number) => {
      arrRegion.push(
        <option value={location.id} key={index}>
          {location.name}
        </option>,
      );
    });

    return arrRegion;
  };

  const changRegion = () => (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeRegion(e.target.value);
    console.log(e.target.value)
    setRegion(e.target.value);
  };

  const renderState = () => {
    const arrState: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    states.map((state: ILocationParams, index: number) => {
      arrState.push(
        <option value={state.id} key={index}>
          {state.name}
        </option>,
      );
    });
    return arrState;
  };

  return (
    <form
      autoComplete="off"
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}

      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          {...register('email', {
            required: 'emailRequire',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'emailInvalid',
            },
          })}
        />

        {errors.email && (
          <small className="text-danger">
            <FormattedMessage id={errors.email.message} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          {...register('password', {
            required: 'passwordRequire',
            minLength: {
              value: 4,
              message: 'minPasswordInvalid',
            },
          })}
        />

        {errors.password && (
          <small className="text-danger">
            <FormattedMessage id={errors.password.message} />
          </small>
        )}

      </div>

      <div className="col-md-12">

        <label htmlFor="inputRepeatPassword" className="form-label">
          <FormattedMessage id="repeatPassword" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputRepeatPassword"
          {...register('repeatPassword', {
            required: 'true',
            validate: (value: string) => value === password
          })}
        
        />
        
        {errors.repeatPassword?.type === 'required' && (
          <small className="text-danger">
            <FormattedMessage id="passwordRequire" />
          </small>
        )}

        {errors.repeatPassword?.type === 'validate' && (
          <small className="text-danger">
            <FormattedMessage id="mathPasswordInvalid" />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputName" className="form-label">
          <FormattedMessage id="name" />
        </label>

        <input
          type="text"
          className="form-control"
          id="inputName"
          {...register('name', {
            required: 'nameRequire',
            validate: (value: string) => {
              return value.trim() !== '' || 'nameRequire';
            }
          })}
        />

        {errors.name && (
          <small className="text-danger">
            <FormattedMessage id={errors.name.message} />
          </small>
        )}
      </div>
      
      <div className="col-md-12">
        <label htmlFor="selectGender" className="form-label">
          <FormattedMessage id="gender" />
        </label>
        <select
              className="form-control"
              id="selectGender"
              {...register('gender', {
                required: 'genderRequire',
                validate: (value: string) => {
                  return value.trim() !== '' || 'genderRequire';
                }
              })}
            >
              
              {renderGender()}

            </select>

            {errors.gender && (
              <small className="text-danger">
                <FormattedMessage id={errors.gender.message} />
              </small>
            )}
      </div>

      <div className="col-md-12">
        <label htmlFor="selectRegion" className="form-label">
          <FormattedMessage id="region" />
        </label>
        <select
              className="form-control"
              id="selectRegion"
              // disabled={loading}
              {...register('region', {
                required: 'regionRequire',
                validate: (value: string) => {
                  return value.trim() !== '' || 'regionRequire';
                }
              })}
              onChange={changRegion()}

            >
              
              {renderRegion()}
            </select>

        {errors.region && (
          <small className="text-danger">
            <FormattedMessage id={errors.region.message} />
          </small>
        )}
      </div>

      {region && (
        <div className="col-md-12">
        <label htmlFor="selectState" className="form-label">
          <FormattedMessage id="state" />
        </label>
        <select
              className="form-control"
              id="selectState"
              {...register('state', {
                required: 'stateRequire',
                validate: (value: string) => {
                  return value.trim() !== '' || 'stateRequire';
                }
              })}
            >
              <option disabled selected value={''}>
                
              </option>
              {renderState()}
            </select>

            {errors.state && (
              <small className="text-danger">
                <FormattedMessage id={errors.state.message} />
              </small>
           )}
      </div>
      )}
      

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="register" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpFormV2;
