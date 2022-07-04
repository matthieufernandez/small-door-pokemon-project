import React, { useEffect } from "react"
import {
  modal,
  overlay,
  cardContainer,
  cardHeader,
  cardMain,
  cardInfoSection,
  cardFooter,
  cardImage,
  closeButton,
  nameSection,
  cardFlavorText,
  attacks,
  abilities,
  footerSection,
} from "../styles/modal.module.css"

function CardModal({ modalOpen, setModalOpen, cardData, setCardData }) {
  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true)
  })

  function detectKeyDown(e) {
    if (e.key === "Escape") {
      setModalOpen(false)
    }
  }

  if (!modalOpen) return null

  //trainer cards can have attacks

  return (
    <>
      <div className={overlay} />
      <div className={modal}>
        <button className={closeButton} onClick={() => setModalOpen(false)}>
          X
        </button>

        {/* THIS MODAL DISPLAYS ENERGY CARDS */}
        {cardData.supertype === "Energy" && (
          <div className="energyCardDiv">
            <h2 className={cardHeader}>{cardData.name}</h2>
            <div className={cardMain}>
              <img
                className={cardImage}
                src={cardData.images.small}
                alt={"an image of the card: " + cardData.name}
              />
              <div className={abilities}>
                {cardData.rules &&
                  cardData.rules.map(rule => (
                    <p className={cardInfoSection}>{rule}</p>
                  ))}
                {cardData.flavortext && (
                  <p className={cardFlavorText}>{cardData.flavortext}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* THIS MODAL DISPLAYS TRAINER CARDS */}
        {cardData.supertype === "Trainer" && (
          <div className="trainerCardDiv">
            <div className={cardHeader}>
              <h2>{cardData.name}</h2>
              {cardData.hp && <h4>HP: {cardData.hp}</h4>}
              {cardData.subtypes &&
                cardData.subtypes.map((type, index) => (
                  <div className={nameSection} key={index}>
                    <h6>Type: </h6>
                    <h4>{type}</h4>
                  </div>
                ))}
            </div>
            <div className={cardMain}>
              <img
                className={cardImage}
                src={cardData.images.small}
                alt={"an image of the card: " + cardData.name}
              />
              <div className={cardInfoSection}>
                <div className={abilities}>
                  {cardData.rules.map((rule, index) => (
                    <h5 key={index}>{rule}</h5>
                  ))}
                </div>
                {cardData.abilities &&
                  cardData.abilities.map((ability, index) => (
                    <div key={index} className={abilities}>
                      {ability.name && (
                        <h4 className="abilityName">Ability: {ability.name}</h4>
                      )}
                      <h5 className="abilityText">{ability.text}</h5>
                    </div>
                  ))}
                {cardData.attacks &&
                  cardData.attacks.map((attack, index) => (
                    <div className={attacks} key={index}>
                      <h4>{attack.name}</h4>
                      {attack.damage && <h6>Damage: {attack.damage}</h6>}
                      <h6>Energy Cost: {attack.convertedEnergyCost}</h6>
                      <h5>{attack.text}</h5>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* THIS MODAL DISPLAYS POKEMON CARDS */}
        {cardData.supertype === "Pokémon" && (
          <div className={cardContainer}>
            <div className={cardHeader}>
              <div className={nameSection}>
                <h2>{cardData.name}</h2>
                <h4>HP: {cardData.hp}</h4>
              </div>
              <div className={nameSection}>
                {cardData.types &&
                  cardData.types.map(type => (
                    <>
                      <h6>Type: </h6>
                      <h4>{type}</h4>
                    </>
                  ))}
              </div>
              {cardData.evolvesFrom && (
                <div className={nameSection}>
                  <h6>Evolves From: </h6>
                  <h4>{cardData.evolvesFrom}</h4>
                </div>
              )}
              {cardData.evolvesTo && cardData.evolvesTo && (
                <div className={nameSection}>
                  <h6>Evolves To: </h6>
                  <h4>{cardData.evolvesTo[0]}</h4>
                </div>
              )}
            </div>
            <div className={cardMain}>
              <img
                className={cardImage}
                src={cardData.images.small}
                alt={"an image of the card: " + cardData.name}
              />
              <div className={cardInfoSection}>
                {cardData.rules &&
                  cardData.rules.map((rule, index) => (
                    <div className={abilities}>
                      <h5 key={index}>{rule}</h5>
                    </div>
                  ))}
                {cardData.abilities &&
                  cardData.abilities.map((ability, index) => (
                    <div key={index} className={abilities}>
                      {ability.name && (
                        <h4 className="abilityName">Ability: {ability.name}</h4>
                      )}
                      <h5 className="abilityText">{ability.text}</h5>
                    </div>
                  ))}
                {cardData.attacks &&
                  cardData.attacks.map((attack, index) => (
                    <div className={attacks} key={index}>
                      <h4>{attack.name}</h4>
                      {attack.damage && <h6>Damage: {attack.damage}</h6>}
                      <h6>Energy Cost: {attack.convertedEnergyCost}</h6>
                      <h5>{attack.text}</h5>
                    </div>
                  ))}
                {cardData.flavorText && (
                  <p className={cardFlavorText}>{cardData.flavorText}</p>
                )}
              </div>
            </div>
            <div className={cardFooter}>
              {cardData.weaknesses &&
                cardData.weaknesses.map(weakness => (
                  <div className={footerSection}>
                    <h4>Weakness: {weakness.type}</h4>
                    <h3>{weakness.value}</h3>
                  </div>
                ))}
              {cardData.resistances &&
                cardData.resistances.map(resistance => (
                  <div className={footerSection}>
                    <h4>Resistance: {resistance.type}</h4>
                    <h3>{resistance.value}</h3>
                  </div>
                ))}
              {cardData.retreatCost && (
                <div className={footerSection}>
                  <h4>Retreat Cost: </h4>
                  <h3>{cardData.retreatCost.length}</h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CardModal
