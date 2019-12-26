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
`;

const Card = styled.div`
   display: flex;
   flex-flow: row nowrap;
   width: 100%;
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
const StyledMap = styled(Map)`
`;

const GoButton = styled(Button)`
   color: white;
   background: ${color.green};
   &:hover {
      background: ${color.green1};
   }
`;

const toMiles = meters => (meters * 0.000621371192).toFixed(2);

function MapScreen({google, stops}) {
   const [card, setCard] = React.useState(null);
   React.useEffect(() => {
      const request = {
         origin: stops.origin,
         destination: stops.destination,
         waypoints: stops.waypoints.map(waypoint => ({
            location: waypoint,
            stopover: true,
         })),
         optimizeWaypoints: true,
         provideRouteAlternatives: false,
         travelMode: "DRIVING",
         drivingOptions: {
            departureTime: new Date(/* now, or future date */),
            trafficModel: "pessimistic",
         },
         unitSystem: google.maps.UnitSystem.IMPERIAL,
      };

      new google.maps.DirectionsService().route(request, (res, status) => {
         if (status === "OK") {
            const route = res.routes[0];
            const timeInSeconds = route.legs
               .map(leg => leg.duration.value)
               .reduce((total, val) => total + val, 0);
            const routeWaypoints = route.waypoint_order.map(
               i => stops.waypoints[i],
            );
            setCard({
               time:
                  Math.ceil(
                     moment.duration(timeInSeconds, "seconds").as("minutes"),
                  ) + " min",
               distance:
                  toMiles(
                     route.legs
                        .map(leg => leg.distance.value)
                        .reduce((total, val) => total + val, 0),
                  ) + " mi",
               path: [stops.origin, ...routeWaypoints, stops.destination].join(
                  " -> ",
               ),
               link: `https://www.google.com/maps/dir/?api=1&origin=${encodeURI(
                  stops.origin,
               )}&destination=${encodeURI(
                  stops.destination,
               )}&waypoints=${encodeURI(routeWaypoints.join("|"))}`,
            });
         }
      });
   }, []);

   return (
      <Page>
         <StyledMap google={google}></StyledMap>
         {card && (
            <Card>
               <CardItem>
                  <Typography variant="h5" color="primary">
                     {card.time}
                  </Typography>
                  <Typography color="secondary">{card.distance}</Typography>
                  <Typography>{card.path}</Typography>
               </CardItem>
               <CardItem>
                  <GoButton component="a" href={card.link}>
                     GO
                  </GoButton>
               </CardItem>
            </Card>
         )}
      </Page>
   );
}

export default GoogleApiWrapper({
   apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
})(MapScreen);
