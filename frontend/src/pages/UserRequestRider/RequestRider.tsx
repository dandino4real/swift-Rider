/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from "react";
import requestRider from "../UserRequestRider/RequestRider.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import back from "../../assets/back.png";
import DemoNav from "../../components/Navbar/DemoNavbar";

const baseUrl = "http://localhost:4000";

function RequestRider() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	// console.log(formData);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			await axios
				.post(`${baseUrl}/users/order-ride`, formData, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("signature")}`,
					},
				})
				.then((res) => {
					toast.success(res.data.message);
					setTimeout(() => {
						navigate("/user-dashboard");
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.response.data.Error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={requestRider.requestOverAll}>
			<DemoNav />
			<div className={requestRider.requestContainer}>
				<div className={requestRider.requestFirst}>
					<div className={requestRider.request_header}>
						<span className={requestRider.requestBtn}>
							<Link to="/user-dashboard">
								{" "}
								<img src={back} alt="back" />
							</Link>
						</span>
						<h4 className={requestRider.requestTitle}>Request a Rider</h4>
					</div>
					<hr />

					<div className={requestRider.requestFirstLeft}>
						<form className={requestRider.userOrder_f} onSubmit={handleSubmit}>
							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>
									Pick up Location
								</label>
								<input
									className={requestRider.requestInput}
									onChange={handleChange}
									type="text"
									placeholder="Enter pick up Location"
									name="pickupLocation"
								/>
							</div>
							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>
									Drop off Location
								</label>
								<input
									className={requestRider.requestInput}
									onChange={handleChange}
									type="text"
									placeholder="Enter drop off location"
									name="dropOffLocation"
								/>
							</div>
							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>
									Drop off Phone Number
								</label>
								<input
									className={requestRider.requestInput}
									onChange={handleChange}
									type="text"
									placeholder="Enter drop off phone number"
									name="dropOffPhoneNumber"
								/>
							</div>

							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>
									Package Description
								</label>
								<input
									className={requestRider.requestInput}
									onChange={handleChange}
									type="text"
									placeholder="Enter Pickup Location"
									name="packageDescription"
								/>
							</div>
							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>Offer (NGN)</label>
								<input
									className={requestRider.requestInput}
									onChange={handleChange}
									type="number"
									placeholder="Enter an amount"
									name="offerAmount"
								/>
							</div>
							<div style={{ width: "100%" }}>
								<label className={requestRider.requestLabel}>
									Payment Method
								</label>
							</div>
							<div className={requestRider.req_order_form_data}>
								<div className={requestRider.req_order_form_pay}>
									<label htmlFor="Cash">Cash</label>
									<input
										onChange={handleChange}
										type="radio"
										value="Cash"
										name="paymentMethod"
									/>
								</div>
								<div className={requestRider.req_order_form_pay}>
									<label htmlFor="Card">Card</label>
									<input
										onChange={handleChange}
										type="radio"
										value="Card"
										name="paymentMethod"
									/>
								</div>
							</div>

							{/* <Link to="/request-rider-success" className={requestRider.requestLink} ><input type="submit"  onClick={toggleModal} className={requestRider.requestSubmit} value="Order ride" /></Link> */}
							<input
								type="submit"
								onClick={handleSubmit}
								className={requestRider.requestSubmit}
								value="Order ride"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RequestRider;
