"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "cta" | "ghost";
};

export default function Button({ variant = "primary", className = "", ...rest }: Props) {
	const style: React.CSSProperties = {
		background: variant === "cta" ? "var(--color-cta)" : "var(--color-primary)",
		color: "white",
	};

	if (variant === "ghost") {
		style.background = "transparent";
		style.color = "var(--color-foreground)";
	}

	return (
		<button
			{...rest}
			className={"px-4 py-2 rounded-md font-medium " + className}
			style={style}
		/>
	);
}
