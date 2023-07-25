"use client";

import React from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import Logo from "../../assets/logo.png";
import User from "../../assets/user.png";
import { useNavbar } from "./use-navbar";

function Navbar() {
	const presenter = useNavbar();

	return (
		<nav className={styles.container}>
			<div className={styles.logoContainer}>
				<Image className={styles.logo} width="40" src={Logo} alt="user" />
				<span>Cinémathèque</span>
			</div>
			<div className={styles.titleContainer}>
				<span>{presenter.categoryText}</span>
			</div>
			<div className={styles.userContainer}>
				<span>Adrien</span>
				<Image className={styles.user} width="35" src={User} alt="user" />
			</div>
		</nav>
	);
}

export default Navbar;
