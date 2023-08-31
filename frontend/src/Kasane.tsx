import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";

function Kasane() {
    const [tokenID, setTokenID] = useState('0');
    const [otherData, setOtherData] = useState('[]');
    const [layers, setLayers] = useState('[]');
    const [serial, setSerial] = useState('CCBT-');
    const [generator, setGenerator] = useState('0x06ae046986A584514E343fe6E3494D15E713E37a');

    function addressChoice (address: string, comment: string) {
        return (
            <MenuItem value={address}>{comment} ({address})</MenuItem>
        )
    }
    
    function handleKasaneButton() {
        
    }

    return (
        <Stack direction="column" spacing={2} sx={{p: 2}}>
            <TextField color="secondary" label="Token ID" variant="outlined" value={tokenID} onChange={e => setTokenID(e.target.value)}/>
            <TextField color="secondary" label="Other Data" variant="outlined" value={otherData} onChange={e => setOtherData(e.target.value)}/>
            <TextField color="secondary" label="Layers" variant="outlined" value={layers} onChange={e => setLayers(e.target.value)}/>
            <TextField color="secondary" label="Serial Code" variant="outlined" value={serial} onChange={e => setSerial(e.target.value)}/>

            <FormControl fullWidth>
            <InputLabel color="secondary" id="demo-simple-select-label">SVG Generator</InputLabel>
            <Select
                color="secondary"
                value={generator} onChange={e => setGenerator(e.target.value)}
                label="SVG Generator"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={'0x06ae046986A584514E343fe6E3494D15E713E37a'}
            >
                {addressChoice('0x06ae046986A584514E343fe6E3494D15E713E37a', 'disp 2L')}
            </Select>
            </FormControl>
            <Button sx={{p:1}} component="label" variant="contained" color="secondary">
          Kasaneru
          <input accept="image/png, image/jpeg" className="hiddeninput" type="file" onChange={handleKasaneButton}/>
        </Button>
        </Stack>
    )
}

export default Kasane;
