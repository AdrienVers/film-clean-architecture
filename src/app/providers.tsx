"use client";

import React from "react";
import { Provider } from "react-redux";
import { app } from "./app";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return <Provider store={app.store}>{children}</Provider>;
};
