"use client";
import { RecoilRoot } from "recoil";
import Ground from "../components/Ground";
import Menu from "../components/Menu";
import styles from "./page.module.scss";
import { ToastContainer, Slide } from "react-toastify";

export default function Home() {
  return (
    <main className={styles.main}>
      <RecoilRoot>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={1}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
        <Menu />
        <Ground />
      </RecoilRoot>
    </main>
  );
}
