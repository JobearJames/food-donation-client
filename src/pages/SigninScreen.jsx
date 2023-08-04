import { Container, Grid, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { signin } from "../features/auth/authSlice"
import { ButtonPrimary } from "../shared/button"
import { HeadingPrimary } from "../shared/typography"
import { useFormik } from "formik"
import * as yup from "yup"
import { LinkPrimary } from "../shared/link"
import { toast } from 'react-toastify';
import Loader from "../components/Loader"
import { useEffect } from "react"

const SigninScreen = () => {
    const { isLoading, user } = useSelector(state => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const hitFrom = location?.state?.from
    const go = hitFrom ? hitFrom : '/'

    useEffect(() => {
        if (user) {
            navigate(`${go}`)
        }
    }, [user, navigate, go])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email address").required("Required"),
            password: yup.string().min(6, "Invalid password").required("Required"),
        }),

        onSubmit: (values) => {
            const { email, password } = values
            dispatch(signin({ email, password }))
                .unwrap()
                .then(() => {
                    navigate(`${go}`)
                    toast.success('Signed in successfully')
                })
                .catch((error) => toast.error(error))
        }
    })
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = formik

    if (isLoading) {
        return <Loader />
    }
    return (
        <Container maxWidth='sm' component='form' onSubmit={handleSubmit}>
            <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                    <HeadingPrimary variant="h4">
                        Sign in
                    </HeadingPrimary>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type='email'
                        required
                        placeholder="Email"
                        label="Email"
                        name='email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && errors.email?.length > 0}
                        helperText={touched.email && errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type='password'
                        required
                        placeholder="Password"
                        label="Password"
                        name='password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={touched.password && errors.password?.length > 0}
                        helperText={touched.email && errors.password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ButtonPrimary
                        variant="contained"
                        type="submit"
                    >
                        Sign in
                    </ButtonPrimary>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        Don't have an account?
                        <LinkPrimary to='/signup' style={{ marginLeft: '1rem' }}>
                            Sign up
                        </LinkPrimary>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SigninScreen