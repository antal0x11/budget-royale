import * as React from "react";
import styles from "@/styles/user-notification.module.css";

interface Props {
	msg: string;
	notificationType: string;
	closeNotification : () => void;
};

const closeIcon: ReactElement = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);

const errorIcon: ReactElement = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-6 h-6"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
		/>
	</svg>
);

const infoIcon: ReactElement = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-6 h-6"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
		/>
	</svg>
);

export default function UserNotification(props: Props) {

	if (props.notificationType === "notificationType/none") return;

	function handleCloseAction() {
		props.closeNotification({msg: "", type: "notificationType/none"})
	}

	return (
		<div className={styles.container}>
			{props.notificationType === "notificationType/error" &&
				<div className={styles.icon}>{errorIcon}</div>}
			{props.notificationType === "notificationType/info" &&
				<div className={styles.icon}>{infoIcon}</div>}
			<div>{props.msg}</div>
			<div className={styles.icon} onClick={handleCloseAction}>{closeIcon}</div>
		</div>
	);
}
