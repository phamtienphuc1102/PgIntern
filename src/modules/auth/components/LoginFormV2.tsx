import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { ILoginParams } from '../../../models/auth';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginFormV2 = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginParams>();

  const onSubmit = React.useCallback(
    (values: ILoginParams) => {
      onLogin(values)
    },[onLogin]);

  return (
    <form
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

      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="invalidCheck"
            {...register('rememberMe')}
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            <FormattedMessage id="rememberMe" />
          </label>
        </div>
      </div>

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="login" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginFormV2;
