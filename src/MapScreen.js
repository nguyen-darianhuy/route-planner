import React from "react";
import logo from "./RUTA.png";
import styled from "styled-components";
import moment from "moment";
import {color} from "./constants";

import {Map, GoogleApiWrapper, Marker} from "google-maps-react";

import {
   Button,
   Divider as HR,
   Typography,
   TextField,
   IconButton,
} from "@material-ui/core";

const Page = styled.div`
   height: 100%;
   width: 100%;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   overflow: visible;
   postion: relative;
`;

const Card = styled.div`
   display: flex;
   flex-flow: row nowrap;
   width: 100%;
   height: 150px;
   position: absolute;
   bottom: 0;
   left: 0;
   background: white;
   justify-content: space-between;
   align-items: center;
`;

const CardItem = styled.div`
   flex: 1;
   display: flex;
   flex-flow: column nowrap;
   padding: 24px;
`;
const StyledMap = styled(Map)``;

const GoButton = styled(Button)`
   color: white;
   background: ${color.green};
   &:hover {
      background: ${color.green1};
   }
`;
function MapScreen({google}) {
   const cards = [
      {
         time: "17 min",
         distance: "5.4 mi",
         path: "Cal Poly -> Chipotle -> Costco -> CVS",
         link: "https://www.google.com/maps/dir/Cal+Poly,+San+Luis+Obispo,+CA/Chipotle+Mexican+Grill,+Madonna+Road,+San+Luis+Obispo,+CA/Costco+Gasoline,+Froom+Ranch+Way,+San+Luis+Obispo,+CA/CVS,+Madonna+Road,+San+Luis+Obispo,+CA/@35.2777958,-120.7079472,13z/data=!3m1!4b1!4m26!4m25!1m5!1m1!1s0x80ecf1b4054c3551:0x98b3b48a29d99103!2m2!1d-120.6624942!2d35.3050053!1m5!1m1!1s0x80ecf0c2ac99dc6b:0x97530a30128c52d3!2m2!1d-120.6776981!2d35.2626146!1m5!1m1!1s0x80ecf0b8523c8637:0xb7865f6380fdb6f!2m2!1d-120.6915208!2d35.2509527!1m5!1m1!1s0x80ecf0bf8edc0657:0x67a60200b911105!2m2!1d-120.6896385!2d35.2578584!3e0",
      },
   ];

   return (
      <Page>
         <StyledMap google={google}></StyledMap>
         {cards.map(card => (
            <Card key={card}>
               <CardItem>
                  <Typography variant="h5" color="primary">{card.time}</Typography>
                  <Typography color="secondary">{card.distance}</Typography>
                  <Typography>{card.path}</Typography>
               </CardItem>
               <CardItem>
                  <GoButton component="a" href={card.link}>
                     GO
                  </GoButton>
               </CardItem>
            </Card>
         ))}
      </Page>
   );
}

export default GoogleApiWrapper({
   apiKey: "", //ENV VAR
})(MapScreen);
