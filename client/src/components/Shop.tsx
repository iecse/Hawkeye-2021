import React, { ReactElement } from "react";
import Modal from "react-modal";

import square from "../assets/shop-square.png";
import Button from "./Button";

import { powerUps, IPowerUp } from "../utils/data";
import { post } from "../utils/requests";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../context/AuthContext";

interface Props {
  closeHandler: () => void;
  open: boolean;
}

export default function Shop({ closeHandler, open }: Props): ReactElement {
  const [selected, setSelected] = React.useState(0);
  const { addToast } = useToasts();
  const auth = useAuth();

  console.log(selected);

  const handleClose = () => {
    closeHandler();
    setSelected(0);
  };

  const getCurrentPowerUp = () =>
    powerUps.find((up: IPowerUp) => up.id === selected);

  const handleBuy = async () => {
    try {
      const res = await post(`/shop/buy/${selected}`);

      if (res.success) {
        addToast("Purchase Successful", { appearance: "success" });
        auth?.updateScore(res.updatedScore);
      } else {
        addToast("Something Went Wrong", { appearance: "error" });
      }
    } catch (err) {
      await auth?.check();
      closeHandler();
    }
  };

  return (
    <Modal
      onRequestClose={handleClose}
      className="shop-modal"
      overlayClassName="overlay"
      isOpen={open}
    >
      <h1>CHOOSE A POWERUP</h1>
      <div onClick={handleClose} className="close">
        <i className="fas fa-times"></i>
      </div>
      <main>
        <section className="left">
          {powerUps.map((item: IPowerUp) => (
            <div className="item">
              <img onClick={() => setSelected(item.id)} src={square} alt="" />
              <h3>{item.name}</h3>
              <p>
                <span>OWNED :</span> {1}
              </p>
            </div>
          ))}
        </section>
        <section className="right">
          {!!selected && (
            <>
              <div className="name">{getCurrentPowerUp()?.name}</div>
              <p>{getCurrentPowerUp()?.description}</p>
              <div className="bottom">
                <aside>
                  <span>MAXIMUM ALLOWED: </span>
                  {getCurrentPowerUp()?.maximumAllowed}
                </aside>
                <aside>
                  <span>COST:</span> {getCurrentPowerUp()?.cost} points
                </aside>
              </div>
              <Button onClick={handleBuy} name="Buy" />
            </>
          )}
        </section>
      </main>
    </Modal>
  );
}
