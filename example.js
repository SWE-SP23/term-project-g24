import {
	Container,
	Button,
	Grid,
	Paper,
	TextField,
	IconButton,
	InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import axios from "axios";


const Login = () => {

const [values, setValues] = useState({
	email: "",
	pass: "",
	showPass: false,
});

const handleSubmit = (e) => {
	e.preventDefault();
	axios
		.post("https://reqres.in/api/login", {
			email: values.email,
			password: values.pass,
		})
		.then((res) => {
			localStorage.setItem("token", res.data.token);
		})
		.catch((err) => console.error(err));
};
const handlePassVisibilty = () => {
	setValues({
		...values,
		showPass: !values.showPass,
	});
};

	return (
		<div>
<Container maxWidth="sm">
<Grid
	container
	spacing={2}
	direction="column"
	justifyContent="center"
	style={{ minHeight: "100vh" }}>
<Paper elelvation={2} sx={{ padding: 5 }}>
<form onSubmit={handleSubmit}>
<Grid container direction="column" spacing={2}>
	<Grid item>
		<TextField
			type="email"
			fullWidth
			label="Enter your email"
			placeholder="Email Address"
			variant="outlined"
			required
			onChange={(e) => setValues({ ...values, email: e.target.value })}
		/>
	</Grid>

	<Grid item>
	<TextField
		type={values.showPass ? "text" : "password"}
		fullWidth
		label="Password"
		placeholder="Password"
		variant="outlined"
		required
		onChange={(e) => setValues({...values, pass: e.target.value })}
		InputProps={{
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						onClick={handlePassVisibilty}
						aria-label="toggle password"
						edge="end"
					>
						{values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				</InputAdornment>
			),
		}}
	/>
	</Grid>

	<Grid item>
	<Button type="submit" fullWidth variant="contained">
		Sign In
	</Button>
	</Grid>
</Grid>
</form>
</Paper>
</Grid>
</Container>
		</div>
	);
};

export default Login;
