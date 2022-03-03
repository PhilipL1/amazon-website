import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';

function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    console.log(shippingAddress);
    setValue('fullName', shippingAddress.fullName); //field you are going to update, the value you are going to replace with
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postCode', shippingAddress.postCode);
    setValue('country', shippingAddress.country);
  }, []);

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const classes = useStyles();
  const submitHandler = ({ fullName, address, city, postCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postCode, country },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postCode, country })
    );
    router.push('/payment');
  };

  return (
    <Layout title="shipping Address">
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)} //  RED Error Box
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'pattern'
                        ? 'Full Name length needs to be more than 1 '
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address Name"
                  error={Boolean(errors.address)} //  RED Error Box
                  helperText={
                    errors.address
                      ? errors.address.type === 'pattern'
                        ? 'Address length needs to be more than 1 '
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="City"
                  label="City"
                  error={Boolean(errors.city)} //  RED Error Box
                  helperText={
                    errors.city
                      ? errors.city.type === 'pattern'
                        ? 'City length needs to be more than 1 '
                        : 'City is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="postCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postCode"
                  label="Post Code"
                  error={Boolean(errors.postCode)} //  RED Error Box
                  helperText={
                    errors.postCode
                      ? errors.postCode.type === 'pattern'
                        ? 'Post Code length needs to be more than 1 '
                        : 'Post Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)} //  RED Error Box
                  helperText={
                    errors.country
                      ? errors.country.type === 'pattern'
                        ? 'Country length needs to be more than 1 '
                        : 'Country is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullwidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default Shipping;

// import { useRouter } from 'next/router';
// import React, { useContext } from 'react';
// import { Store } from '../utils/Store';

// function Shipping() {
//   const router = useRouter();
//   const { state, dispatch } = useContext(Store);
//   const { userInfo } = state;
//   if (!userInfo) {
//     router.push('/login?redirect=/shipping');
//   }

//   return <div>shipping Page</div>;
// }

// export default Shipping;
