import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, withTypes } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import src from "../images/logo192.png"

import { Notification } from 'react-admin';
import { useLogin, useNotify, useTranslate } from 'ra-core';

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    card: {
        minWidth: 300,
        // marginTop: '6em',
        width: '25%',
        paddingBottom: '1rem'
        // height: '30vh'
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        padding: '0 1em 1em 1em'
    },
    input: {
        marginTop: '1em'
    },
    actions: {
        padding: '2em 1em'
    }
}));

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

interface FormValues {
    email?: string;
    password?: string;
}

const { Form } = withTypes<FormValues>();

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation();

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);
        login(auth, location.state ? location.state.nextPathname : '/').catch(
            (error: Error) => {
                setLoading(false);
                if (error.message == 'Too Many Requests') {
                    notify(
                        translate('alert.manyRequests',{
                            time: 5
                          }),
                        {type: 'warning'}
                    );
                } else {
                    notify(
                        typeof error === 'string'
                            ? error
                            : typeof error === 'undefined' || !error.message
                                ? 'ra.auth.sign_in_error'
                                : error.message,
                        {type: 'warning'}
                    );
                }

            }
        );
    };

    const validate = (values: FormValues) => {
        const errors: FormValues = {};
        if (!values.email) {
            errors.email = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <Card className={classes.card}>
                            <div className={classes.avatar}>
                                <img src={src} alt="" />
                                {/*<Avatar src={src} />*/}
                            </div>
                            {/*<div className={classes.hint}>*/}
                            {/*    Hint: demo / demo*/}
                            {/*</div>*/}
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="email"
                                        // @ts-ignore
                                        component={renderInput}
                                        label='Email'
                                        disabled={loading}
                                    />
                                </div>
                                <div className={classes.input}>
                                    <Field
                                        name="password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={translate('ra.auth.password')}
                                        type="password"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <CardActions className={classes.actions}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={25}
                                            thickness={2}
                                        />
                                    )}
                                    {translate('ra.auth.sign_in')}
                                </Button>
                            </CardActions>
                        </Card>
                        <Notification />
                    </div>
                </form>
            )}
        />
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
export const MyLoginPage = (props: any) => (
    <ThemeProvider theme={createTheme({})}>
        <Login {...props} />
    </ThemeProvider>
);
