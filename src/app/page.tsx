"use client";
import { RecoilRoot } from "recoil";
import Ground from "../components/Ground";
import Menu from "../components/Menu";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <RecoilRoot>
        <Menu />
        <Ground />
      </RecoilRoot>
    </main>
  );
}
