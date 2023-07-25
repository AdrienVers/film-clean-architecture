"use client";

import React from "react";
import Navbar from "../navbar/infrastructure/Navbar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<>
			<Navbar />
			<div>{children}</div>
		</>
	);
};
