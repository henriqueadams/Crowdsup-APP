import { Header, Event } from "../../components/"

import "./Home.screen.styles.css"
import { EVENTS } from "../../../constants/events"
export function Home() {
  const CIDADE = "Rolante"
  return (
    <div className="background home-background">
      <Header />
      <div className="padding-header ">
        <div className="home-content-container">
          <h2 className="home-title">{"Ações Sociais em " + CIDADE} </h2>
          <div className="div-events">
            {EVENTS.map((event, index) => {
              return <Event event={event} key={index} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
