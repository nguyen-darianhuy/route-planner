import React from "react";
import logo from "./RUTA.png";
import styled from "styled-components";
import moment from "moment";

import {
   Button,
   Divider as HR,
   Typography,
   TextField,
   IconButton,
} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import {color} from "./constants";

const Page = styled.div`
   height: 100%;
   width: 100%;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

const Header = styled.div`
   display: flex;
   flex-flow: column nowrap;
   justify-content: center;
   align-items: center;
   padding: 24px 0;
   img {
      top: -3px;
      left: -64px;
      width: 128px;
   }
`;

const Logo = styled.div`
   display: flex;
   flex-flow: row nowrap;
   justify-content: center;
`;

const Form = styled.form`
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

const AddressField = styled(TextField).attrs({variant: "outlined"})`
   margin: 8px 0;
`;

const RemoveIconButton = styled(IconButton)``;

const Stop = styled.div`
   position: relative;
   ${RemoveIconButton} {
      position: absolute;
      top: 22px;
      right: -36px;
   }
`;

const AddIcon = styled(AddCircleOutlineIcon)`
   color: ${color.green1};
`;

const RemoveIcon = styled(RemoveCircleOutlineIcon)`
   color: ${color.green1};
`;

const Divider = styled(HR)`
   height: 5px;
`;

const DoneButton = styled(Button)`
   background: ${color.green};
   color: white;
   margin: 24px 0;
   height: 48px;

   &:hover {
      background: ${color.green1};
   }
`;

function TitleScreen({next}) {
   const [origin, setOrigin] = React.useState("");
   const [destination, setDestination] = React.useState("");
   const [stops, setStops] = React.useState([{id: 0, address: ""}]);

   const changeOrigin = e => setOrigin(e.target.value);
   const changeDestination = e => setDestination(e.target.value);
   const changeStop = id => e => {
      setStops(
         stops.map(stop =>
            stop.id === id ? {id: id, address: e.target.value} : stop,
         ),
      );
   };

   const addStop = () => {
      setStops([...stops, {id: stops[stops.length - 1].id + 1, address: ""}]);
   };

   const removeStop = id => () => {
      setStops(stops.filter(stop => stop.id !== id));
   };

   return (
      <Page>
         <Header>
            <img src={logo} alt="logo" />
            <Logo>
               <Typography variant="h2" color="primary">
                  RUTA
               </Typography>
            </Logo>
            <Typography variant="h6" color="secondary">
               Mapped solution — no sweat
            </Typography>
         </Header>
         <Form>
            <Typography variant="h6" color="primary">
               Where do you plan to go?
            </Typography>
            <AddressField
               label="From"
               required
               color="secondary"
               onChange={changeOrigin}
            />
            {stops.map(stop => (
               <Stop key={stop.id}>
                  <AddressField
                     value={stop.address}
                     label="Stop"
                     placeholder="..."
                     onChange={changeStop(stop.id)}
                  />
                  <RemoveIconButton size="small" onClick={removeStop(stop.id)}>
                     <RemoveIcon />
                  </RemoveIconButton>
               </Stop>
            ))}
            <IconButton onClick={addStop}>
               <AddIcon fontSize="large" />
            </IconButton>
            <AddressField
               label="To"
               required
               color="secondary"
               onChange={changeDestination}
            />

            <Divider />

            <Typography variant="h6" color="primary">
               Depart at?
            </Typography>
            <AddressField
               label="Time"
               type="datetime-local"
               // defaultValue="2017-05-24T10:30"
               defaultValue={moment()
                  .format()
                  .substring(0, 16)}
               InputLabelProps={{
                  shrink: true,
               }}
            />
            <DoneButton
               onClick={next({
                  origin: origin,
                  destination: destination,
                  waypoints: stops.map(stop => stop.address),
               })}>
               Show my fastest route!
            </DoneButton>
         </Form>
      </Page>
   );
}

export default TitleScreen;
