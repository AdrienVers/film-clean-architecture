import "./globals.css";
import type { Metadata } from "next";
import { AppWrapper } from "../modules/application/AppWrapper";
import { Layout } from "../modules/application/Layout";
import Head from "next/head";

export const metadata: Metadata = {
	title: "Cinémathèque",
	description: "Inventaire des livres achetés et à acheter",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<body>
				<AppWrapper>
					<Layout>{children}</Layout>
				</AppWrapper>
			</body>
		</html>
	);
}
