import { Reducer, useEffect, useReducer } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Mock } from 'src/api/Mock';
import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Divider from 'src/components/Divider';
import Form from 'src/components/Form';
import TextField from 'src/components/Input';
import Message from 'src/components/Message';
import Spinner from 'src/components/Spinner';
import Title from 'src/components/Title';
import Typography from 'src/components/Typography';
import { Navigator } from 'src/utils/Navigator';

type FormValues = {
    username: string;
    password: string;
};

type Action =
    | { readonly type?: 'request' }
    | { readonly type?: 'loading' }
    | { readonly type?: 'success'; username?: any }
    | { readonly type?: 'failure'; requestError?: string };

type State = {
    signedIn?: boolean;
    username?: string;
    loading?: boolean;
    requestError?: string;
};

const reducer: Reducer<State, Action> = (
    state: State,
    action: Action,
): State => {
    switch (action.type) {
        case 'failure':
            return {
                ...state,
                loading: false,
                signedIn: undefined,
                requestError: action.requestError,
            };
        case 'loading':
            return {
                ...state,
                requestError: undefined,
                signedIn: undefined,
                loading: true,
            };
        case 'success':
            return {
                ...state,
                loading: false,
                signedIn: true,
                username: action.username,
                requestError: undefined,
            };
    }
    return state;
};

export default function SignIn() {
    const initialState: State = { loading: false, signedIn: false };
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm<FormValues>();
    const [state, dispatch] = useReducer(reducer, initialState);

    const onFormValid = (e: FormValues) => {
        dispatch({ type: 'loading' });
        Mock.login(e.username, e.password)
            .then((token) => {
                console.debug(`Got token ${token}`);
                dispatch({ type: 'success', username: e.username });
            })
            .catch((e) => {
                dispatch({ type: 'failure', requestError: e.toString() });
            });
    };

    const onFormInvalid = (e: DeepMap<FormValues, FieldError>) => {
        console.error(e);
    };

    const textError = (e: FieldError) => {
        const message: Record<string, string> = {
            required: 'Field must be filled',
        };

        return (
            <Typography type="error">{message[e.type] || e.type}</Typography>
        );
    };

    useEffect(() => {
        if (state.requestError) {
            Message.fail(state.requestError);
        }

        if (state.signedIn && state.username) {
            history.push(
                Navigator.build({
                    path: '/data',
                    params: { username: state.username },
                }),
            );
        }
    }, [state, history]);

    return (
        <div className="flex h-screen">
            <Card className="flex w-screen h-screen md:w-3/6 xl:w-2/6 m-auto">
                <div className="w-11/12 ml-auto mt-20 h-auto ">
                    <section>
                        <Form
                            onSubmit={handleSubmit(onFormValid, onFormInvalid)}
                        >
                            <Title level="h1">
                                sign in
                                <br />
                            </Title>

                            <Typography>Username</Typography>
                            <TextField
                                aria-invalid={
                                    errors.username ? 'true' : 'false'
                                }
                                ref={register({ required: true })}
                                name="username"
                                placeholder="username@mail.com"
                            />
                            {errors.username && textError(errors.username)}

                            <Typography>Password</Typography>
                            <TextField
                                aria-invalid={
                                    errors.password ? 'true' : 'false'
                                }
                                ref={register({
                                    minLength: 3,
                                    required: true,
                                })}
                                name="password"
                                placeholder="**********"
                                password
                            />
                            {errors.password && textError(errors.password)}

                            <Divider />
                            <div className="flow-root">
                                <Button className="float-right">Login</Button>
                                <Button
                                    className="float-right"
                                    type="secondary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        Message.success(
                                            'You have created a new account!',
                                        );
                                    }}
                                >
                                    create
                                </Button>
                            </div>
                        </Form>
                    </section>
                    <section className="flex">
                        {state.loading && (
                            <Spinner className="ml-auto mr-auto m-14" />
                        )}
                    </section>
                </div>
            </Card>
        </div>
    );
}
