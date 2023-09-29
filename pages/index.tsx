import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/intro.module.css";
import { Button } from "@mui/material";

const information = `
Budget Royale is a utility app that helps you 
control, organize and manage in a better way 
your expenses. You create categories of them 
and set higher priorities to the important ones. 

Budget Royale is free and does not track your 
activity. So what are you waiting for?
`;

// interface ButtonProps {
// 	displayTag: string;
// 	action: () => void;
// }

// function Button(props: ButtonProps) {
// 	return (
// 		<>
// 			<button
// 				name={"Button"}
// 				className={styles.btnLinkApp}
// 				onClick={props.action}
// 			>
// 				{props.displayTag}
// 			</button>
// 		</>
// 	);
// }

const ButtonStyle = {
	color: "white",
	borderColor: "white",
	marginRight: "10px",
	fontSize: "18px"
};

/**
 *  Home is the component for the landing page.
 *
 */
export default function Home() {
	const router = useRouter();

	function action(): void {
		router.push("/expenses");
	}

	return (
		<div className={styles.pageContainer}>
			<Head>
				<title>Budget Royale</title>
			</Head>
			<div className={styles.container}>
				<section className={styles.topSection}>
					<div>
						<h2>Budget Royale</h2>
					</div>
				</section>
				<section className={styles.middleSection}>
					<pre>{information}</pre>
				</section>
				<section className={styles.bottomSection}>
					{/*<Button displayTag={"Go To App"} action={action} />*/}

					<Button
						variant={"outlined"}
						color={"primary"}
						style={ButtonStyle}
						onClick={action}
					>
						{"Let's Start"}
					</Button>

					<Link href={"https://github.com/antal0x11/my-expenses"}>
						<Image
							src={"/images/github-mark-white.png"}
							width={35}
							height={35}
							alt={"GitHub Invertocat"}
						/>
					</Link>
				</section>
			</div>
		</div>
	);
}
