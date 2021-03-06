import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import styles from "../styles/Home.module.css";
import charsheet from "../styles/Charsheet.module.css";
import { randomFromArray, rollNdX } from "../components/utils";
import character from "../data/character";

export default function Character() {
  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [wil, setWil] = useState(0);
  const [gold, setGold] = useState(0);
  const [belongings, setBelongings] = useState([]);
  const [counter, setcounter] = useState(0);
  const reroll = () => {
    setStr(rollNdX(1, 3));
    setDex(rollNdX(1, 3));
    setWil(rollNdX(1, 3));
    setGold(5 * rollNdX(2, 6));
    let i = 0;
    const belongingArray = ["2 Supplies", "A dagger (3 dmg)"];
    while (i < 3) {
      belongingArray.push(
        randomFromArray(
          character[0].options.filter((item) => !belongingArray.includes(item))
        )
      );
      i++;
    }
    while (i > 1 && i < 16) {
      belongingArray.push("");
      i++;
    }
    setBelongings(belongingArray);
    setcounter(counter + 1);
  };
  useEffect(() => {
    reroll();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Character Generator for DURF</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.printhide}>
          <h1 className={styles.title}>DURF Character Generator</h1>
          <div>
            <Link href="/character">Characters</Link>
            {/* <Link href="/monsters">Monsters</Link> */}
            {/* <Link href="/items">Magical Items</Link> */}
          </div>
          <button onClick={reroll} className={charsheet.reroll}>
            Reroll
          </button>
        </div>

        <div className={charsheet.charsheet} key={counter}>
          <div className={charsheet.charname}>
            <p>Name:</p>
          </div>
          <div className={charsheet.charbody}>
            <div className={charsheet.charleft}>
              <div className={charsheet.charabilities}>
                <b>STR:</b>
                <span>+{str}</span>
                <b>DEX:</b>
                <span>+{dex}</span>
                <b>WIL:</b>
                <span>+{wil}</span>
              </div>
              <div
                className={classNames(charsheet.charhealth, charsheet.roundtop)}
              >
                <p>
                  <b>HD</b>
                </p>
                <p>
                  <b>Wounds</b>
                </p>
                <span>1</span>
                <span></span>
              </div>
              <div
                className={classNames(
                  charsheet.chararmor,
                  charsheet.roundbottom
                )}
              >
                <p>
                  Current
                  <br />
                  <span>0</span>
                </p>
                <p>
                  Max
                  <br />
                  <span>0</span>
                </p>
                <p className={charsheet.wide}>
                  <b>Armor</b>
                </p>
              </div>
              <div
                className={classNames(
                  charsheet.charxp,
                  charsheet.roundtop,
                  charsheet.roundbottom
                )}
              >
                <p>
                  <b>XP</b>
                </p>
              </div>
            </div>
            <div className={charsheet.charcenter}>
              <div
                className={classNames(
                  charsheet.charinventory,
                  charsheet.roundtop,
                  charsheet.roundbottom
                )}
              >
                {belongings.map((item, i) => {
                  return (
                    <p
                      key={item + i}
                      className={classNames(charsheet.slot, {
                        [`${charsheet.inactive}`]: i >= str + 10,
                      })}
                    >
                      {i + 1}. {item}
                    </p>
                  );
                })}
                <p className={charsheet.noborder}>Gold: {gold}</p>
                <p className={charsheet.noborder}>
                  Inventory slots: {10 + str}
                </p>
              </div>
            </div>
            <div className={charsheet.charright}>
              <div
                className={classNames(
                  charsheet.charportrait,
                  charsheet.roundtop
                )}
              >
                <p>Portrait/Notes</p>
              </div>
              <div
                className={classNames(
                  charsheet.charspells,
                  charsheet.roundbottom
                )}
              >
                <p>Spells</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
