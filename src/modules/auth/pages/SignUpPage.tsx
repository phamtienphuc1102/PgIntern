import React, { useEffect, useState } from 'react';
import logo from '../../../logo-420-x-108.png';
import { ISignUpParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import SignUpFormV2 from '../components/SignUpFormV2';
import SignUpForm from '../components/SignUpForm';
import { useTranslation } from 'react-i18next';
import '../../../i18n/i18n'
import { Popover, Button } from 'react-bootstrap';

const SignUpPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [idRegion, setIdRegion] = useState('');
  const [showPopover, setShowPopover] = useState(false);

  const { t, i18n } = useTranslation()
  const togglePopover = () => setShowPopover(!showPopover);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    togglePopover();
  };

  const getLocation = React.useCallback(async (idRegion?: string) => {
    setLoading(true);

    const json = await dispatch(
      fetchThunk(idRegion ? `${API_PATHS.getLocation}?pid=${idRegion}` : API_PATHS.getLocation, 'get'),
    );

    setLoading(false);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      console.log(json.data);
      
      idRegion ? setStates(json.data) : setLocations(json.data);
      return;
    }
  }, []);

  useEffect(() => {
    getLocation(idRegion);
  }, [getLocation, idRegion]);

  const onSignUp = React.useCallback(
    async (values: ISignUpParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signUp, 'post', values),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  const onChangeRegion = (idRegion: string) => {
    setIdRegion(idRegion);
  };

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="d-inline-block">
      
        <Button
          variant="link"
          onClick={togglePopover}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            color: '#007bff',
            fontSize: '16px',
            fontWeight: 'bold',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {t('changeLanguage')}
      </Button>
      <Popover show={showPopover}>
        <Popover.Body>
          <Button variant="link" onClick={() => changeLanguage('vi')}>
            vi
          </Button>
          
          <Button variant="link" onClick={() => changeLanguage('en')}>
            en
          </Button>
        </Popover.Body>
      </Popover>
    </div>

      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <SignUpFormV2
        onSignUp={onSignUp}
        loading={loading}
        errorMessage={errorMessage}
        locations={locations}
        states={states}
        onChangeRegion={onChangeRegion}
      />
    </div>
  );
};

export default SignUpPage;
