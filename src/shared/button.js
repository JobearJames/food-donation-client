import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const ButtonPrimary = styled(Button)(({ theme }) => ({
    color: '#333',
    fontWeight: '600',
    border: '0.5px solid #333',
    textTransform: 'none',
    '&:hover':{
        color: 'black'
    }
}))

export const ButtonDelete = styled(Button)(({theme})=>({
    
}))